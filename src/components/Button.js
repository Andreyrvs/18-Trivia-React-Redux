import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { children, btnType, dataTest, handleClick } = this.props;
    return (
      <button
        type={ btnType === 'submit' ? 'submit' : 'button' }
        data-testid={ dataTest }
        onClick={ handleClick }
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string,
  btnType: PropTypes.string,
  dataTest: PropTypes.string,
  handleClick: PropTypes.func,
}.isRequire;

export default Button;
