import React, { Component } from 'react';
import { getApiSearchFilms } from '../../services/api-service';
import MovieCard from '../../component/MovieCard';
import styles from './MoviesPage.module.css';
import queryString from 'query-string';

class MoviesPage extends Component {
  state = {
    query: '',
    films: [],
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search).query;
    if (query) {
      getApiSearchFilms(query).then(res => this.setState({ films: res }));
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.location.search !== this.props.location.search) {
  //     console.log('Search');
  //   }
  // }

  inputChange = ({ currentTarget: { value } }) => {
    this.setState({ query: value });
  };

  onSubmit = evt => {
    evt.preventDefault();
    if (!this.state.query) {
      return;
    }
    getApiSearchFilms(this.state.query).then(data => {
      this.setState({ films: data });
    });

    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { films } = this.state;
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
        {films ? (
          <div className={styles.MoviesPage}>
            {films.map(({ id, title, poster_path }) => (
              <MovieCard
                key={id}
                id={id}
                title={title}
                poster_path={poster_path}
              />
            ))}
          </div>
        ) : (
          <span className={styles.alert}>Not found.</span>
        )}
      </>
    );
  }
}
export default MoviesPage;
