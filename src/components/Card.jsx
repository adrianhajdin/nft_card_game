import React from 'react';

import styles from '../styles';

const Card = ({ cardImg, title, restStyles }) => (
  <div className={`${styles.cardContainer} ${restStyles} hover:scale-[1.05] transition-all`}>
    <img src={cardImg} alt="ace_card" className={styles.cardImg} />

    <div className={`${styles.cardPointContainer} left-[29.2%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-yellow-400`}>7</p>
    </div>
    <div className={`${styles.cardPointContainer} right-[24.2%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-red-700`}>17</p>
    </div>

    <div className={styles.cardTextContainer}>
      <p className={styles.cardText}>{title}</p>
    </div>
  </div>
);

export default Card;
