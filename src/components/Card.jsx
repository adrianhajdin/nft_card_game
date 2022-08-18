import React from 'react';

import styles from '../styles';

const Card = ({ cardImg, title, restStyles }) => (
  <div className={`${styles.cardContainer} ${restStyles} hover:scale-110`}>
    <img src={cardImg} alt="ace_card" className={styles.cardImg} />

    <div className={`${styles.cardPointContainer}  bottom-[31.5%] left-[21.5%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-yellow-400`}>7</p>
    </div>
    <div className={`${styles.cardPointContainer} bottom-[31.5%] right-[14.2%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-red-700`}>17</p>
    </div>

    <div className={styles.cardTextContainer}>
      <p className={styles.cardText}>{title}</p>
    </div>
  </div>
);

export default Card;
