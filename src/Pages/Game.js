import React, { Component } from 'react';
import Header from '../components/Header';
import fetchTokenAPI from '../services';

// const RESPONSE_CODE_ERR = 3;

class Game extends Component {
  // constructor(props) {
  //   super(props);

  // this.handleExpiredToken = this.handleExpiredToken.bind(this);
  // }

  componentDidMount() {
    fetchTokenAPI();
  }

  // handleExpiredToken() {
  //   fetchQuestionsAPI();
  // }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default (Game);
