import React, { Component } from 'react';
import { getApiSearchFilms } from '../../services/api-service';
import MovieCard from '../../component/MovieCard';
import styles from './MoviesPage.module.css';

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
        <form onSubmit={this.onSubmit} className={styles.form}>
          <input
            type="text"
            autoFocus
            autoComplete="off"
            onChange={this.inputChange}
            placeholder="Choose a movie title"
            className={styles.input}
          />
          <button type="submit" className={styles.btn}>
            Search
          </button>
        </form>

        {found ? (
          <>
            <ul className={styles.MoviesPage}>
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
