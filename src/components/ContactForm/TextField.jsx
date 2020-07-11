import React, { PureComponent } from "react";
import styles from './style.module.scss';
import ErrorMessage from './ErrorMessage';
import PropTypes from "prop-types";

class TextField extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  
  state = {
    value: this.props.value,
    error: ''
  };
  
  handleInputChange = (e) => {
    this.props.onChange(e);
    const value = e.target.value;
    this.setState({ value });
  };
  
  validate = () => {
    const error = this.props.validate ? this.props.validate(this.state.value) : '';
    this.setState({ error });
    if (!error) return;
    return { [this.props.name]: error }
  };
  
  render() {
    const { value, error } = this.state;
    return(
      <>
        {this.props.type === 'text' ? (
          <input
            value={value}
            placeholder={this.props.placeholder}
            type="text"
            name={this.props.name}
            className={!!error ? styles['has-error'] : ''}
            onChange={(e) => this.handleInputChange(e)}
            onBlur={this.validate}
          />
        ) : (
          <textarea
            defaultValue={value}
            placeholder={this.props.placeholder}
            name={this.props.name}
            className={!!error ? styles['has-error'] : ''}
            rows="4"
            onChange={(e) => this.handleInputChange(e)}
            onBlur={this.validate}
          />
        )}
        <ErrorMessage show={!!error} message={error} />
      </>
    )
  }
}

export default TextField
