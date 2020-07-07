import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ films, location }) => (
  <>
    {films.map(({ id, title, poster_path }) => {
      if (!poster_path) {
        return console.log(`id: ${id}, movie "${title}" not have poster`);
      }

      return (
        <li key={id} className={styles.MovieCard}>
          <NavLink
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
            className={styles.link}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
              alt={title}
            />
            <p>{title}</p>
          </NavLink>
        </li>
      );
    })}
  </>
);

export default withRouter(MovieCard);

// const MovieCard = ({ films, location }) => (
//   <>
//     {films.map(({ id, title, poster_path }) => (
//       <li key={id} className={styles.MovieCard}>
//         {poster_path && (
//           <NavLink
//             to={{
//               pathname: `/movies/${id}`,
//               state: { from: location },
//             }}
//             className={styles.link}
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
//               alt={title}
//             />
//             <p>{title}</p>
//           </NavLink>
//         )}
//       </li>
//     ))}
//   </>
// );
