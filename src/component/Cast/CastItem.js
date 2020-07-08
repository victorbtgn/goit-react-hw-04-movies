import React from 'react';
import { posterUrl } from '../../services/api-service';
import styles from './CastItem.module.css';

const CastItem = ({ name, profilePath }) => (
  <li className={styles.CastItem}>
    <img src={`${posterUrl(200)}/${profilePath}`} width="150" alt={name} />
    <span>{name}</span>
  </li>
);

export default CastItem;
