import React from 'react';
import styles from './style.module.scss';

const SuccessMessage = ({ show, message }) => {
  return show ? (
    <div className={styles['success-msg']}>
      <span className={styles['success-msg__icon']}><i className="ti-check" /></span>
      <span>{ message }</span>
    </div>
  ) : null
};

export default SuccessMessage;
