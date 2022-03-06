import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      children,
      btnType,
      dataTest,
      handleClick,
      isDisable,
      style,
      bsClass,
    } = this.props;
    return (
      <button
        type={ btnType === 'submit' ? 'submit' : 'button' }
        data-testid={ dataTest }
        onClick={ handleClick }
        className={ bsClass }
        disabled={ isDisable }
        style={ style }
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
  isDisable: PropTypes.bool,
  style: PropTypes.string,
  bsClass: PropTypes.string,
}.isRequire;

export default Button;
