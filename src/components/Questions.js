import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Question extends Component {
  render() {
    const { questionCategory, questionText, answers } = this.props;
    return (
      <section>
        <div>
          <h1>{questionCategory}</h1>
          <h2>{questionText}</h2>
        </div>
        <div>
          {/* {answers.map((item) => (
            <div key={ item }>
              <Button
                btnType="Button"
              >
                {item}
              </Button>
            </div>
          ))} */}
        </div>
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
