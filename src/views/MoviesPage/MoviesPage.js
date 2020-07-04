import React, { Component } from 'react';
import { getApiSearchFilms } from '../../services/api-service';
import MovieCard from '../../component/MovieCard';

class MoviesPage extends Component {
  state = {
    query: '',
    films: [],
    found: true,
  };

  componentDidMount() {
    if (this.props.getMoviePageList) {
      this.setState({ films: this.props.getMoviePageList });
      this.props.setMoviePageList([]);
    }
  }

  componentWillUnmount() {
    if (this.state.films.length > 0) {
      this.props.setMoviePageList(this.state.films);
    }
  }

  inputChange = ({ currentTarget: { value } }) => {
    this.setState({ query: value });
  };

  onSubmit = evt => {
    evt.preventDefault();

    getApiSearchFilms(this.state.query).then(data => {
      if (data.length === 0) {
        this.setState({ found: false });
        return;
      }

      this.setState({ films: data, found: true });
    });

    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { found } = this.state;

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            autoFocus
            autoComplete="off"
            onChange={this.inputChange}
          />
          <button type="submit">Search</button>
        </form>

        {found ? (
          <>
            <h1>Search movies</h1>
            <ul>
              <MovieCard films={this.state.films} />
            </ul>
          </>
        ) : (
          <span>Not found.</span>
        )}
      </>
    );
  }
}

export default MoviesPage;
