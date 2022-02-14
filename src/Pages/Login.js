import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import login from '../Redux/actions/index';

class Login extends Component {
  constructor() {
    super();
    this.handleValidation = this.handleValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      email: '',
      name: '',
      disable: true,
    };
  }

  formSubmit(event) {
    event.preventDefault(event);
    const { email, name } = this.state;
    const { onSubmit } = this.props;

    onSubmit({
      email,
      nome: name,
    });
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
              btnType="submit"
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
