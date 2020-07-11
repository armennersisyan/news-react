import React from 'react';
import styles from './style.module.scss';

const ErrorMessage = ({ show, message }) => {
  return show ? (
    <div>
      <span className={styles['error-msg']}>{ message }</span>
    </div>
  ) : null
};

export default ErrorMessage;
