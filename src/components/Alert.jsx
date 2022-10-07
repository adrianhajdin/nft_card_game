import React from 'react';

import { alertIcon } from '../assets';
import styles from '../styles';

const Alert = ({ type, message }) => (
  <div className={`absolute z-10 top-5 left-0 right-0 ${styles.flexCenter}`}>
    <div className={`p-4 rounded-lg font-rajdhani font-semibold text-lg ${type}`} role="alert">
      <img src={alertIcon} alt="Alert" />
      {message}
    </div>
  </div>
);

export default Alert;
