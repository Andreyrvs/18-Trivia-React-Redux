import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import tokenThunk from '../redux/actions';
import fetchTokenAPI, { fetchQuestionsAPI } from '../services';

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
    const { tokenThunks } = this.props;

    const RESPONSE_CODE_THREE = 3;
    const getlocalToken = localStorage.getItem('token');
    const questions = await fetchQuestionsAPI(getlocalToken);
    console.log(questions);
    if (getlocalToken) {
      this.setState({
        results: [questions.results],
      });
    }
    if (questions.response_code === RESPONSE_CODE_THREE) {
      await tokenThunks();
      const newToken = localStorage.getItem('token');
      const newQuestions = await fetchQuestionsAPI(newToken);
      this.setState({
        results: [newQuestions.results],
      });
    }
  }

  render() {
    return (
      <section>
        <Header />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenThunks: () => dispatch(tokenThunk()),
});

Game.propTypes = {
  tokenThunks: PropTypes.func,
}.isRequire;

export default connect(null, mapDispatchToProps)(Game);
