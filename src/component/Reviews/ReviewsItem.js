import React from 'react';
import styles from './ReviewsItem.module.css';

const ReviewsItem = ({ author, content }) => (
  <li className={styles.ReviewsItem}>
    <h2 className={styles.title}>{author}</h2>
    <p className={styles.review}>{content}</p>
  </li>
);

export default ReviewsItem;
