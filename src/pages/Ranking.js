import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Ranking extends Component {
  loginPageButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <Button
          dataTest="btn-go-home"
          btnType="button"
          handleClick={ this.loginPageButton }
        >
          Ir para Login
        </Button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Ranking;
