import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getApiTrendingFilms } from '../../services/api-service';

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
          {this.state.films.map(({ id, title, poster_path }) => (
            <NavLink key={id} to={`/movies/${id}`}>
              <li>
                <p>{title}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt=""
                />
              </li>
            </NavLink>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
