import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LogoTrivia from '../assets/trivia.png';
import tokenThunk, { player } from '../redux/actions/index';
import Button from '../components/Button';
import BlobBg from '../assets/blog.svg';

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
    token().then(() => history.push('/game'));
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
    const { history } = this.props;
    const bootstrap = 'd-flex flex-column align-items-center justify-content-center vw-100 vh-100';
    return (
      <div
        style={ { backgroundImage: `url(${BlobBg})`, backgroundRepeat: 'no-repeat' } }
        className={ `App ${bootstrap}` }
      >
        <img
          className="w-50 h-25"
          src={ LogoTrivia }
          alt="logo"
        />
        <section className="d-flex w-50">
          <form className="mb-3 d-flex flex-column w-100">
            <label htmlFor="input-name" className="form-label m-2">
              {' '}
              Nome do Jogador
              <input
                id="input-name"
                data-testid="input-player-name"
                className="form-control"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-email" className="form-label m-2">
              Email do Gravatar:
              <input
                id="input-email"
                data-testid="input-gravatar-email"
                className="form-control"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <Button
              dataTest="btn-play"
              isDisable={ disable }
              bsClass="btn btn-primary m-2"
              btnType="button"
              handleClick={ this.handleClick }
            >
              Play
            </Button>
            <Button
              dataTest="btn-settings"
              btnType="button"
              bsClass="btn btn-secondary m-2"
              handleClick={ () => { history.push('/settings'); } }
            >
              Configurações
            </Button>
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
