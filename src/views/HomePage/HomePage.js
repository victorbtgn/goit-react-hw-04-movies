import React, { Component } from 'react';
import { getApiTrendingFilms } from '../../services/api-service';
import MovieCard from '../../component/MovieCard';

class HomePage extends Component {
  state = {
    films: [],
  };

  componentWillMount() {
    getApiTrendingFilms().then(data => this.setState({ films: data }));
  }

  render() {
    return (
      <>
        <h1>Trending today</h1>
        <ul>
          <MovieCard films={this.state.films} />
        </ul>
      </>
    );
  }
}

export default HomePage;
