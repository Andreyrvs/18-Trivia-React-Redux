import React, { Component } from 'react';
import '../components/components.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  handleFeedback = () => {
    const WELL_DONE_ASSERTIONS = 3;
    const { assertions } = this.props;
    console.log(assertions);
    const isWellDone = assertions >= WELL_DONE_ASSERTIONS;
    return isWellDone ? (
      <h1 data-testid="feedback-text">Well Done!</h1>
    ) : (
      <h1 data-testid="feedback-text">Could be better...</h1>
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
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
