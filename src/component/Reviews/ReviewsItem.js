import React from 'react';

const ReviewsItem = ({ author, content }) => (
  <li>
    <h2>{author}</h2>
    <p>{content}</p>
  </li>
);

export default ReviewsItem;
