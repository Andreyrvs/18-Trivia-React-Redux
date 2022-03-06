import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './components.css';

class Question extends Component {
  constructor() {
    super();
    this.handleAnswers = this.handleAnswers.bind(this);
    this.handleBorderColor = this.handleBorderColor.bind(this);
    this.handleCountDown = this.handleCountDown.bind(this);

    this.state = {
      correctColor: '',
      incorrectColor: '',
      timer: 30,
    };
  }

  componentDidMount() {
    this.handleCountDown();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleAnswers() {
    const { results } = this.props;
    const { correctColor, incorrectColor, timer } = this.state;
    const NUMBER_ZERO_POINT_FIVE = 0.5;
    if (results.length > 0) {
      const answers = [...results[0].incorrect_answers, results[0].correct_answer];
      const shuffled = answers.sort(() => Math.random() - NUMBER_ZERO_POINT_FIVE);

      return (
        <>
          {shuffled.map((item, index) => (
            <section key={ index } data-testid="answer-options">
              <Button
                btnType="button"
                bsClass="btn btn-secondary btn-lg"
                isDisable={ timer === 0 }
                style={ { border: `${
                  results[0].correct_answer === item
                    ? correctColor
                    : incorrectColor}`,
                } }
                handleClick={ () => this.handleBorderColor(
                  results[0].correct_answer, item,
                ) }
                dataTest={ results[0].correct_answer === item
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

  handleBorderColor(correctAnswer, item) {
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

  handleCountDown() {
    const COUNTDOWN_FROM_ONE_TO_ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      const { timer } = this.state;
      if (timer === 1) {
        clearInterval(this.timer);
        this.handleBorderColor();
      }
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, COUNTDOWN_FROM_ONE_TO_ONE_SECOND);
  }

  render() {
    const { results } = this.props;
    const { timer } = this.state;

    // console.log(results);
    if (results.length === 0) {
      return <h1>Loading</h1>;
    }
    return (
      <section className="main__game">
        <section className="game__questions card">
          <section className="questions card-body">
            <h2
              className="card-header"
              data-testid="question-category"
            >
              {results[0].category}
            </h2>
            <p
              className="card-text lead"
              data-testid="question-text"
            >
              {results[0].question}
            </p>
          </section>
          <h1 className="text-center text-danger">
            Timer:
            {' '}
            {timer}
          </h1>
        </section>
        <section className="game__answers">
          {this.handleAnswers()}
        </section>
      </section>
    );
  }
}
Question.propTypes = {
  questionCategory: PropTypes.string,
  questionText: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.string),
}.isRequire;

export default Question;
