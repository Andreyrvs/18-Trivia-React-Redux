import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import tokenThunk from '../redux/actions';
import fetchTokenAPI, { fetchQuestionsAPI } from '../services';
import Question from '../components/Questions';

export class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.generateToken();
  }

  async generateToken() {
    const { token } = this.props;

    const RESPONSE_CODE_THREE = 3;
    const getlocalToken = localStorage.getItem('token');
    const questions = await fetchQuestionsAPI(token);

    console.log('questions', questions);
    console.log('getLocalToken', getlocalToken);
    if (getlocalToken) {
      console.log('Passou 1 if');
      this.setState({
        results: [questions.results],
      });
    }
    if (questions.response_code === RESPONSE_CODE_THREE) {
      console.log('passou 2 if');
      await fetchTokenAPI();
      const newToken = localStorage.getItem('token');
      const newQuestions = await fetchQuestionsAPI(newToken);
      console.log('NewQuestions', newQuestions);
      this.setState({
        results: [newQuestions.results],
      });
    }
  }

  render() {
    const { results } = this.state;
    console.log('results', results);

    return (
      <section>
        <Header />
        <main>
          {/* <Question /> */}
        </main>
      </section>
    );
  }
}

const mapStateToProps = ({ token }) => ({
  token,
});

Game.propTypes = {
  tokenThunks: PropTypes.func,
}.isRequire;

export default connect(mapStateToProps)(Game);
