import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import { login, tokenThunk } from '../Redux/actions/index';

class Login extends Component {
  constructor() {
    super();
    this.handleValidation = this.handleValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClicks = this.handleClicks.bind(this);

    this.state = {
      email: '',
      name: '',
      disable: true,
    };
  }

  saveToken = (token) => {
    const getLocalStorage = localStorage.getItem('token');
    console.log(getLocalStorage);

    localStorage.setItem('token', token);
  }

  handleClicks(event) {
    event.preventDefault();

    const { email, name } = this.state;
    const { history, onSubmit, tokenAPI, token } = this.props;
    console.log(token);
    tokenAPI({
      token,
    });

    onSubmit({
      email,
      name,
    });

    this.saveToken(token);
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
            <Button
              dataTest="btn-play"
              isDisable={ disable }
              btnType="button"
              handleClick={ this.handleClicks }
            >
              Play
            </Button>
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.TokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (state) => dispatch(login(state)),
  tokenAPI: (state) => dispatch(tokenThunk(state)),
});

Login.propTypes = {
  onSubmit: PropTypes.func,
}.isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
