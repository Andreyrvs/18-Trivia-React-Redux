import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './components.css';

class Header extends Component {
  render() {
    const { player } = this.props;
    return (
      <header className="header bg-secondary">
        <section className="header__player">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` }
            alt="Foto de perfil"
          />
          <h3
            className="header__player-name m-2"
            data-testid="header-player-name"
          >
            { player.name }
          </h3>
        </section>
        <section className="header__player-score">
          <span data-testid="header-score">
            Pontos:
            {' '}
            { player.score }
          </span>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.object,
}.isRequire;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, null)(Header);
