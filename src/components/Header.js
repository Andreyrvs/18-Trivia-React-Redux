import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './components.css';
import { urlImageGravatar } from '../redux/actions';

class Header extends Component {
  render() {
    const { playerName, gravatarEmail, score } = this.props;
    const playerData = JSON.parse(localStorage.getItem('player'));
    console.log('/feedback => score', playerData);
    return (
      <header className="header bg-secondary">
        <section className="header__player">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            alt="Foto de perfil"
          />
          <h3
            className="header__player-name m-2"
            data-testid="header-player-name"
          >
            Jogador:
            {' '}
            {playerName }
          </h3>
        </section>
        <section className="header__player-score">
          <h1>
            Pontos:
          </h1>
          <h1 data-testid="header-score">{ Number(score) }</h1>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  urlImageGravatars: (state) => dispatch(urlImageGravatar(state)),
});

Header.propTypes = {
  player: PropTypes.object,
}.isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
