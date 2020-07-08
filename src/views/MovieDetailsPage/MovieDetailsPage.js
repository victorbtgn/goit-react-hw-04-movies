import React, { Component, Suspense, lazy } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { posterUrl, getApiFilmById } from '../../services/api-service';
import Button from '../../component/Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './MovieDetailsPage.module.css';

const Cast = lazy(
  () => import('../../component/Cast') /* webpackChunkName: "cast-component" */,
);

const Reviews = lazy(
  () =>
    import(
      '../../component/Reviews'
    ) /* webpackChunkName: "reviews-component" */,
);

class MovieDetailsPage extends Component {
  state = {
    movie: {
      title: '',
      poster_path: '',
      overview: '',
      release_date: '',
      popularity: 0,
      genres: [],
      budget: 0,
    },
    filmId: null,
    pathName: '',
  };

  componentWillMount() {
    const filmId = this.props.match.params.movieId;
    const pathName = this.props.location.state.from.pathname;

    this.setState({ filmId: filmId, pathName: pathName });

    getApiFilmById(filmId).then(data =>
      this.setState({
        movie: {
          title: data.title,
          poster_path: data.poster_path,
          overview: data.overview,
          release_date: data.release_date,
          popularity: data.popularity,
          genres: data.genres,
          budget: data.budget,
        },
      }),
    );
  }

  render() {
    const { movie, pathName } = this.state;
    const { match, location, history } = this.props;
    const year = movie.release_date.substring(0, 4);

    return (
      <section className={styles.MovieDetailsPage}>
        <Button location={location} history={history} />

        <div className={styles.moviePreview}>
          <img
            src={`${posterUrl(400)}/${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
          <div>
            <h1 className={styles.title}>
              {movie.title} ({year})
            </h1>
            <p className={styles.overview}>
              User Score: {Math.ceil(movie.popularity)}&#37;
            </p>
            <h2>Overview</h2>
            <p className={styles.overview}>{movie.overview}</p>
            <h2>Genres</h2>
            <p className={styles.overview}>
              {movie.genres.map(genre => (
                <span key={genre.name} className={styles.genres}>
                  {genre.name}
                </span>
              ))}
            </p>
            <h2>Budget: {movie.budget.toLocaleString('ru-RU')}&#36;</h2>
          </div>
        </div>

        <div className={styles.AdditionalInfo}>
          <h2>Additional information</h2>

          <div className={styles.LinkBlock}>
            <NavLink
              to={{
                pathname: `${match.url}/cast`,
                state: { from: pathName },
              }}
              className={styles.Link}
              activeClassName={styles.activeLink}
            >
              Cast
            </NavLink>
            <NavLink
              to={{
                pathname: `${match.url}/reviews`,
                state: { from: pathName },
              }}
              className={styles.Link}
              activeClassName={styles.activeLink}
            >
              Reviews
            </NavLink>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="Loader">
              <Loader type="Oval" color="#8d0ab4" width={100} />
            </div>
          }
        >
          <Route
            path={`${match.path}/cast`}
            render={props => {
              return <Cast id={this.state.filmId} />;
            }}
          />

          <Route
            path={`${match.path}/reviews`}
            render={props => {
              return <Reviews id={this.state.filmId} />;
            }}
          />
        </Suspense>
      </section>
    );
  }
}

export default MovieDetailsPage;
