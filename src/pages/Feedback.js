import React, { Component } from 'react';
import '../components/components.css';
import Header from '../components/Header';

export class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
      </div>
    );
  }
}

export default Feedback;
