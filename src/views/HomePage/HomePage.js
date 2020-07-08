import React, { Component } from 'react';
import { getApiTrendingFilms } from '../../services/api-service';
import MovieCard from '../../component/MovieCard';
import Glider from 'glider-js/glider';
import 'glider-js/glider.css';
import styles from './HomePage.module.css';

class HomePage extends Component {
  state = {
    films: [],
  };

  componentWillMount() {
    getApiTrendingFilms().then(data => {
      this.setState({ films: data });
      this.slider();
    });
  }

  slider = () => {
    new Glider(document.querySelector('#glider'), {
      slidesToShow: 5,
      slidesToScroll: 5,
      draggable: true,
      dots: '.dots',
      scrollLock: true,
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next',
      },
    });
  };

  render() {
    return (
      <>
        <h1 className={styles.HomePageTitle}>Trending today</h1>
        <div id="glider" className={styles.HomePageList}>
          {this.state.films.map(({ id, title, poster_path }) => (
            <MovieCard
              key={id}
              id={id}
              title={title}
              poster_path={poster_path}
            />
          ))}
        </div>

        <button
          aria-label="Previous"
          style={{ left: '160px' }}
          className="glider-prev"
        >
          «
        </button>
        <button
          aria-label="Next"
          style={{ right: '200px' }}
          className="glider-next"
        >
          »
        </button>
        <div role="tablist" className="dots"></div>
      </>
    );
  }
}

export default HomePage;
