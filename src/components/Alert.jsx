import React from 'react';

import styles from '../styles';

const Alert = ({ type, message }) => (
  <div className={`absolute z-10 top-5 left-0 right-0 ${styles.flexCenter}`}>
    <div className={`p-4 rounded-lg font-rajdhani font-semibold text-lg ${styles[type]}`} role="alert">
      <svg
        aria-hidden="true"
        className={`flex-shrink-0 inline w-6 h-6 mr-2 ${styles[type]}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      {message}
    </div>
  </div>
);

export default Alert;
