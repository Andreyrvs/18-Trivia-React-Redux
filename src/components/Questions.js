import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

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
    const { correctColor, incorrectColor } = this.state;
    const NUMBER_FIVE = 0.5;
    if (results.length > 0) {
      const answers = [...results[0].incorrect_answers, results[0].correct_answer];
      const shuffled = answers.sort(() => Math.random() - NUMBER_FIVE);

      return (
        <>
          {shuffled.map((item, index) => (
            <section key={ index } data-testid="answer-options">
              <Button
                style={ { border: `${
                  results[0].correct_answer === item
                    ? correctColor
                    : incorrectColor}`,
                } }
                btnType="button"
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
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      const { timer } = this.state;
      if (timer === 1) {
        clearInterval(this.timer);
      }
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { results } = this.props;
    const { timer } = this.state;

    // console.log(results);
    if (results.length === 0) {
      return <h1>Loading</h1>;
    }
    return (
      <>
        <h2 data-testid="question-category">{results[0].category}</h2>
        <h2 data-testid="question-text">{results[0].question}</h2>
        {this.handleAnswers()}
        <h1>
          Timer:
          {' '}
          {timer}
        </h1>
      </>
    );
  }
}
Question.propTypes = {
  questionCategory: PropTypes.string,
  questionText: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.string),
}.isRequire;

export default Question;
