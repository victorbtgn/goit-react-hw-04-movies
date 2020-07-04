import React, { Component, Suspense, lazy } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { getApiFilmById } from '../../services/api-service';
import Button from '../../component/Button/Button';

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
    filmId: null,
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
    const { title, poster_path, overview } = this.state;
    const { match, location, history } = this.props;

    return (
      <>
        <Button location={location} history={history} />

        <h1>{title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
          alt={title}
        />
        <p>{overview}</p>
        <NavLink
          to={{
            pathname: `${match.url}/cast`,
            state: { from: location },
          }}
        >
          Cast
        </NavLink>
        <NavLink
          to={{
            pathname: `${match.url}/reviews`,
            state: { from: location },
          }}
        >
          Reviews
        </NavLink>

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
      </>
    );
  }
}

export default MovieDetailsPage;
