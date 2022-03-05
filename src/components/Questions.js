import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Question extends Component {
  constructor() {
    super();
    this.handleAnswers = this.handleAnswers.bind(this);
    this.handleBorderColor = this.handleBorderColor.bind(this);

    this.state = {
      correctColor: '',
      incorrectColor: '',
    };
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

  render() {
    const { results } = this.props;
    console.log(results);
    if (results.length === 0) {
      return <h1>Loading</h1>;
    }
    return (
      <>
        <h2 data-testid="question-category">{results[0].category}</h2>
        <h2 data-testid="question-text">{results[0].question}</h2>
        {this.handleAnswers()}

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
