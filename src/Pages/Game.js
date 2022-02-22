import React, { Component } from 'react';
import Header from '../components/Header';
import fetchTokenAPI, { fetchQuestionsAPI } from '../services';

const RESPONSE_CODE_ERR = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getQuestions = async () => {
    const apiToken = JSON.parse(localStorage.getItem('token'));
    const URL_API = `https://opentdb.com/api.php?amount=5&token=${apiToken.token}`;

    const questions = fetchQuestionsAPI(URL_API);
    if (questions.response_code === RESPONSE_CODE_ERR) {
      const token = await fetchTokenAPI();
      localStorage.setItem('token', token);

      const newToken = JSON.parse(localStorage.getItem('token'));
      const NEW_URL_API = `https://opentdb.com/api.php?amount=5&token=${newToken.token}`;
      return fetchQuestionsAPI(NEW_URL_API);
    }
    return questions;
  }

  handleShowQuestions = async () => {
    const questions = await this.getQuestions();
    const { results } = questions;
    console.log(questions);
  }

  render() {
    return (
      <div>
        <Header />

      </div>
    );
  }
}

export default (Game);
