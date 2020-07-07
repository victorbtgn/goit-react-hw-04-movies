import React, { Component } from 'react';
import { getApiTrendingFilms } from '../../services/api-service';
import MovieCard from '../../component/MovieCard';
import styles from './HomePage.module.css';

class HomePage extends Component {
  state = {
    films: [],
  };

  componentWillMount() {
    getApiTrendingFilms().then(data => {
      this.setState({ films: data });
    });
  }

  render() {
    return (
      <>
        <h1 className={styles.HomePageTitle}>Trending today</h1>
        <ul className={styles.HomePageList}>
          <MovieCard films={this.state.films} />
        </ul>
      </>
    );
  }
}

export default HomePage;
