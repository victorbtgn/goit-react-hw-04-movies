import React, { Component, Suspense, lazy } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { getApiFilmById } from '../../services/api-service';
import Button from '../../component/Button/Button';
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
    title: null,
    poster_path: null,
    overview: null,
    release_date: '',
    popularity: 0,
    filmId: null,
    genres: [],
    budget: 0,
  };

  componentWillMount() {
    const filmId = this.props.match.params.movieId;
    const location = this.props.location.state;

    this.setState({ filmId: filmId, location: location });

    getApiFilmById(filmId).then(data =>
      this.setState(prevState => ({ ...prevState, ...data })),
    );
  }

  render() {
    const {
      title,
      poster_path,
      overview,
      release_date,
      popularity,
      genres,
      budget,
    } = this.state;
    const { match, location, history } = this.props;
    const year = release_date.substring(0, 4);

    return (
      <section className={styles.MovieDetailsPage}>
        <Button location={location} history={history} />

        <div className={styles.moviePreview}>
          <img
            src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
            alt={title}
            className={styles.poster}
          />
          <div>
            <h1 className={styles.title}>
              {title} ({year})
            </h1>
            <p className={styles.overview}>
              User Score: {Math.ceil(popularity)}&#37;
            </p>
            <h2>Overview</h2>
            <p className={styles.overview}>{overview}</p>
            <h2>Genres</h2>
            <p className={styles.overview}>
              {genres.map(genre => (
                <span key={genre.name} className={styles.genres}>
                  {genre.name}
                </span>
              ))}
            </p>
            <h2>Budget: {budget.toLocaleString('ru-RU')}&#36;</h2>
          </div>
        </div>

        <hr />

        <h2>Additional information</h2>

        <NavLink
          to={{
            pathname: `${match.url}/cast`,
            state: { from: location },
          }}
          className={styles.Link}
          activeClassName={styles.activeLink}
        >
          Cast
        </NavLink>
        <NavLink
          to={{
            pathname: `${match.url}/reviews`,
            state: { from: location },
          }}
          className={styles.Link}
          activeClassName={styles.activeLink}
        >
          Reviews
        </NavLink>

        <hr />

        <Suspense fallback={<h2>Loading...</h2>}>
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
