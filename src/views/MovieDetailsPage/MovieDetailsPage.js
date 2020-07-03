import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { getApiFilmById } from '../../services/api-service';
import Cast from '../../component/Cast/Cast';
import Reviews from '../../component/Reviews/Reviews';

class MovieDetailsPage extends Component {
  state = {
    title: null,
    poster_path: null,
    overview: null,
    filmId: null,
  };

  componentWillMount() {
    const filmId = this.props.match.params.movieId;

    this.setState({ filmId: filmId });

    getApiFilmById(filmId).then(data =>
      this.setState(prevState => ({ ...prevState, ...data })),
    );
  }

  render() {
    const { title, poster_path, overview } = this.state;
    const { match } = this.props;

    return (
      <>
        <h1>{title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
          alt={title}
        />
        <p>{overview}</p>
        <NavLink to={`${match.url}/cast`}>Cast</NavLink>
        <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>

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
      </>
    );
  }
}

export default MovieDetailsPage;
