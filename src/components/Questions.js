import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerScore } from '../redux/actions';
import Button from './Button';
import './components.css';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      correctColor: '',
      incorrectColor: '',
      timer: 30,
      isHidden: false,
      nextQuestion: 0,
    };
  }

  componentDidMount() {
    this.handleCountDown();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleAnswers = () => {
    const { results } = this.props;
    const { correctColor, incorrectColor, timer, nextQuestion } = this.state;
    const NUMBER_ZERO_POINT_FIVE = 0.5;

    if (results.length > 0) {
      const answers = [
        ...results[nextQuestion].incorrect_answers, results[nextQuestion].correct_answer,
      ];
      const shuffled = answers.sort(() => Math.random() - NUMBER_ZERO_POINT_FIVE);

      return (
        <>
          {shuffled.map((item, index) => (
            <section key={ index } data-testid="answer-options">
              <Button
                style={ { border: `${
                  results[nextQuestion].correct_answer === item
                    ? correctColor
                    : incorrectColor}`,
                } }
                btnType="button"
                bsClass="btn btn-secondary btn-lg"
                isDisable={ timer === 0 }
                handleClick={ () => this.handleClick(
                  results[nextQuestion].correct_answer, item,
                ) }
                dataTest={ results[nextQuestion].correct_answer === item
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
              >
                {item}

              </Button>
            </section>
          ))}
        </>
      );
    }
  }

  handleClick = (correctAnswer, item) => {
    clearInterval(this.timer);
    this.handleScore(correctAnswer, item);
    this.handleButtonNext();
    return correctAnswer === item
      ? this.setState({
        correctColor: '3px solid rgb(6, 240, 15)',
        incorrectColor: '3px solid rgb(255, 0, 0)',
      })
      : this.setState({
        incorrectColor: '3px solid rgb(255, 0, 0)',
        correctColor: '3px solid rgb(6, 240, 15)',
      });
  }

  handleCountDown = () => {
    const COUNTDOWN_FROM_ONE_TO_ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval(this.timer);
        this.handleClick();
      } else {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }, COUNTDOWN_FROM_ONE_TO_ONE_SECOND);
  }

  handleScore = (correctAnswer, item) => {
    const {
      results,
      score, headerScore,
      playerName, gravatarImage,
      assertions,
    } = this.props;
    const { timer, nextQuestion } = this.state;
    const NUMBER_TEN = 10;
    const EASY_DIFFICULTY_IS_WORTH_ONE_POINT = 1;
    const MEDIUM_DIFFICULTY_IS_WORTH_TWO_POINTS = 2;
    const HARD_DIFFICULTY_IS_WORTH_THREE_POINTS = 3;
    let sumResults = 0;
    let allAssertions = 0;

    if (results[nextQuestion].difficulty === 'easy' && correctAnswer === item) {
      const easy = NUMBER_TEN + (timer * EASY_DIFFICULTY_IS_WORTH_ONE_POINT);
      sumResults += easy + headerScore;
      allAssertions = assertions + 1;
    } else if (correctAnswer !== item) {
      return headerScore + 0;
    }

    if (results[nextQuestion].difficulty === 'medium' && correctAnswer === item) {
      const medium = NUMBER_TEN + (timer * MEDIUM_DIFFICULTY_IS_WORTH_TWO_POINTS);
      sumResults += medium + headerScore;
      allAssertions = assertions + 1;
    } else if (correctAnswer !== item) {
      return headerScore + 0;
    }

    if (results[nextQuestion].difficulty === 'hard' && correctAnswer === item) {
      const hard = NUMBER_TEN + (timer * HARD_DIFFICULTY_IS_WORTH_THREE_POINTS);
      sumResults += hard + headerScore;
      allAssertions = assertions + 1;
    } else if (correctAnswer !== item) {
      return headerScore + 0;
    }

    console.log('sum', sumResults);
    localStorage.setItem('player', JSON.stringify(
      [
        { name: playerName, score: sumResults, picture: gravatarImage },
      ],
    ));
    score({ score: sumResults, assertions: allAssertions });
  }

  handleButtonNext = () => {
    this.setState({
      isHidden: true,
    });
  }

  handleNextQuestion = () => {
    clearInterval(this.timer);
    this.setState((prevState) => ({
      nextQuestion: prevState.nextQuestion + 1,
      incorrectColor: '',
      correctColor: '',
      timer: 30,
    }), () => this.handleCountDown());
  }

  handleChangeRoute = () => {
    const { history } = this.props;
    history.push('/feedback');
  }

  render() {
    const LAST_QUESTION_POSITIONS_NUMER = 4;
    const { results } = this.props;
    const { timer, isHidden, nextQuestion } = this.state;

    if (results.length === 0) {
      return <h1>Loading</h1>;
    }
    return (
      <section className="main__game">
        <section className="game__questions">
          <section className="card">
            <section className="questions card-body bg-light">
              <h2
                className="card-header"
                data-testid="question-category"
              >
                {results[nextQuestion].category}
              </h2>
              <p
                className="card-text lead"
                data-testid="question-text"
              >
                {results[nextQuestion].question}
              </p>
            </section>
          </section>
          <h1 className="text-center text-danger">
            Tempo:
            {' '}
            {timer}
          </h1>
        </section>
        <section className="game__answers">
          {this.handleAnswers()}
          { nextQuestion !== LAST_QUESTION_POSITIONS_NUMER
            ? (
              <Button
                btnType="button"
                bsClass="btn btn-success btn-lg"
                dataTest="btn-next"
                handleClick={ this.handleNextQuestion }
                style={ isHidden ? { display: 'block' } : { display: 'none' } }
              >
                Proxima
              </Button>
            ) : (
              <Button
                btnType="button"
                bsClass="btn btn-warning btn-lg"
                dataTest="btn-next"
                handleClick={ this.handleChangeRoute }
              >
                Feedback
              </Button>
            )}
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  headerScore: state.player.score,
  playerName: state.player.name,
  gravatarImage: state.player.urlImage,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  score: (state) => dispatch(playerScore(state)),
});

Question.propTypes = {
  questionCategory: PropTypes.string,
  questionText: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.string),
}.isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
