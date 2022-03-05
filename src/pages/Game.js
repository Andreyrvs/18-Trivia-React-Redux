import React, { Component } from 'react';
import Header from '../components/Header';
import fetchTokenAPI from '../services';

export class Game extends Component {
  componentDidMount() {
    fetchTokenAPI();
  }

  render() {
    return (
      <div><Header /></div>
    );
  }
}

export default Game;
