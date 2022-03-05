import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenThunk, { player } from '../redux/actions/index';

class Login extends Component {
  constructor() {
    super();
    this.handleValidation = this.handleValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      name: '',
      disable: true,
    };
  }

  handleClick(event) {
    event.preventDefault(event);

    const { email, name } = this.state;
    const { history, login, token } = this.props;

    login({
      gravatarEmail: email,
      name,
    });
    token();

    history.push('/game');
  }

  handleChange({ target }) {
    const { name, type, checked, value } = target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.handleValidation());
  }

  handleValidation() {
    const { name, email } = this.state;
    const regexEmail = /\w+@+\w+\.+\w/;

    const verifyEmail = regexEmail.test(email);
    const verifyName = name.length !== 0;
    const verifyInputs = verifyEmail && verifyName;

    if (verifyInputs) {
      this.setState({
        disable: false,
      });
    }

    return verifyInputs;
  }

  render() {
    const { disable, name, email } = this.state;
    return (
      <div className="App">
        <section>
          <form>
            <label htmlFor="input-name">
              Nome do Jogador:
              <input
                id="input-name"
                data-testid="input-player-name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-email">
              Email do Gravatar:
              <input
                id="input-email"
                data-testid="input-gravatar-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>

            <button
              data-testid="btn-play"
              disabled={ disable }
              type="button"
              onClick={ this.handleClick }
            >
              Play
            </button>
          </form>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(player(state)),
  token: () => dispatch(tokenThunk()),
});

Login.propTypes = {
  onSubmit: PropTypes.func,
}.isRequire;

export default connect(null, mapDispatchToProps)(Login);
