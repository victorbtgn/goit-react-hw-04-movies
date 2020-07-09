import React, { Component } from 'react';
import { getApiSearchFilms } from '../../services/api-service';
import MovieCard from '../../component/MovieCard';
import SearchBar from '../../component/SearchBar';
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      getApiSearchFilms(this.state.query).then(data => {
        this.setState({ films: data });
      });
    }
  }

  formSubmit = query => {
    this.setState({ query: query });
    this.props.history.push({ search: `query=${query}` });
  };

  render() {
    const { films } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.formSubmit} />

        {films ? (
          <div className={styles.MoviesPage}>
            {films.map(({ id, title, poster_path }) => (
              <MovieCard
                locationSearch={this.props.location.search}
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
