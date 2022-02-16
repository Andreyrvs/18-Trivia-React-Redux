import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}`}
          alt="Foto de perfil"
        />
        <span data-testid="header-player-name">{ player.name }</span>
        <span data-testid="header-score">{ player.score }</span>
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
