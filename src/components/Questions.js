import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Question extends Component {
  render() {
    const { category, question, answears } = this.props;
    console.log('category', category);
    console.log('question', question);
    console.log('answears', answears);
    return (
      <section>
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-text">{question}</div>
      </section>
    );
  }
}
Question.propTypes = {
  questionCategory: PropTypes.string,
  questionText: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
}.isRequire;

export default Question;
