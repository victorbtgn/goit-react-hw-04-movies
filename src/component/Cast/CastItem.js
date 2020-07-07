import React from 'react';
import styles from './CastItem.module.css';

const CastItem = ({ name, profilePath }) => (
  <li className={styles.CastItem}>
    <img
      src={`https://image.tmdb.org/t/p/w200/${profilePath}`}
      width="150"
      alt={name}
    />
    <span>{name}</span>
  </li>
);

export default CastItem;
