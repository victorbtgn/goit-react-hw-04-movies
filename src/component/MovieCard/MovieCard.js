import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const MovieCard = ({ films, location }) => (
  <>
    {films.map(({ id, title, poster_path }) => (
      <NavLink
        key={id}
        to={{
          pathname: `/movies/${id}`,
          state: { from: location },
        }}
      >
        <li>
          <p>{title}</p>
          <img
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            alt={title}
          />
        </li>
      </NavLink>
    ))}
  </>
);

export default withRouter(MovieCard);
