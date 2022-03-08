import React, { Component } from 'react';
import '../components/components.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  handleFeedback = () => {
    const WELL_DONE_ASSERTIONS = 3;
    const { assertions, score } = this.props;
    console.log(assertions);
    const isWellDone = assertions >= WELL_DONE_ASSERTIONS;
    return isWellDone ? (
      <div>
        <h1 data-testid="feedback-text">Well Done!</h1>
        <div>
          <p>Você acertou</p>
          <span data-testid="feedback-total-question">
            {Number(assertions)}
          </span>
          <p> questões!</p>
        </div>
        <div>
          <p>Um total de</p>
          <span data-testid="feedback-total-score">{Number(score)}</span>
          <p>pontos.</p>
        </div>
      </div>
    ) : (
      <div>
        <h1 data-testid="feedback-text">Could be better...</h1>
        <div>
          <p>Você acertou</p>
          <span data-testid="feedback-total-question">
            {Number(assertions)}
          </span>
          <p> questões!</p>
        </div>
        <div>
          <p>Um total de</p>
          <span data-testid="feedback-total-score">{Number(score)}</span>
          <p>pontos.</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        {this.handleFeedback()}
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
