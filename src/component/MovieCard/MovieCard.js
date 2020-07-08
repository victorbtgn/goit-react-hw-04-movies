import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { posterUrl } from '../../services/api-service';
import styles from './MovieCard.module.css';

const MovieCard = ({ id, title, poster_path, location }) => {
  return (
    <>
      {poster_path && (
        <div className={styles.MovieCard}>
          <NavLink
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
            className={styles.link}
          >
            <img src={`${posterUrl(200)}/${poster_path}`} alt={title} />
            <p>{title}</p>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default withRouter(MovieCard);
