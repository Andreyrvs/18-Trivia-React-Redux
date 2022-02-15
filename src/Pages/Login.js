import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import login from '../Redux/actions/index';
import fetchTokenAPI from '../services';

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

  async handleClicks(event) {
    event.preventDefault();

    const { email, name } = this.state;
    const { history, onSubmit } = this.props;

    const token = await fetchTokenAPI();

    onSubmit({
      token,
      email,
      name,
    });

    localStorage.setItem('TOKEN_API', token);

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
          <form onSubmit={ (event) => this.formSubmit(event) }>
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

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (state) => dispatch(login(state)),
});

Login.propTypes = {
  onSubmit: PropTypes.func,
}.isRequire;

export default connect(null, mapDispatchToProps)(Login);
