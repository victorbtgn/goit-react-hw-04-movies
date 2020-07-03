import React from 'react';

const CastItem = ({ name, profilePath }) => (
  <li>
    <img src={`https://image.tmdb.org/t/p/w200/${profilePath}`} alt={name} />
    <span>{name}</span>
  </li>
);

export default CastItem;
