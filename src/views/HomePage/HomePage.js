import React, { Component } from 'react';
import { homePageApiRequest } from '../../services/api-service';

class HomePage extends Component {
  state = {
    films: [],
  };

  componentWillMount() {
    homePageApiRequest().then(data => this.setState({ films: data }));
  }

  render() {
    return (
      <>
        <h1>Trending today</h1>
        <ul>
          {this.state.films.map(({ id, title, poster_path }) => (
            <li key={id}>
              <h2>{title}</h2>
              <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
