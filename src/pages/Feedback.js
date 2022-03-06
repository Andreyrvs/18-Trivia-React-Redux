import React, { Component } from 'react';
import Header from '../components/Header';

export class Feedback extends Component {
  render() {
    return (
      <section
        data-testid="feedback-text"
      >
        <Header />
      </section>
    );
  }
}

export default Feedback;
