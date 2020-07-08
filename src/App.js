import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './component/AppBar/AppBar';
import Container from './component/Container';
import routes from './routes';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';

const HomePage = lazy(
  () => import('./views/HomePage') /* webpackChunkName: "home-view" */,
);

const MoviesPage = lazy(
  () => import('./views/MoviesPage') /* webpackChunkName: "movie-view" */,
);

const MovieDetailsPage = lazy(
  () =>
    import(
      './views/MovieDetailsPage'
    ) /* webpackChunkName: "movie-details-view" */,
);

class App extends Component {
  state = {
    moviePageList: [],
  };

  setMoviePageList = films => {
    this.setState({ moviePageList: films });
  };

  render() {
    return (
      <>
        <AppBar />

        <Suspense
          fallback={
            <div className="Loader">
              <Loader type="Oval" color="#8d0ab4" width={100} />
            </div>
          }
        >
          <Container>
            <Switch>
              <Route exact path={routes.home} component={HomePage} />
              <Route path={routes.movieDetails} component={MovieDetailsPage} />

              <Route
                path={routes.movies}
                render={props => {
                  return (
                    <MoviesPage
                      setMoviePageList={this.setMoviePageList}
                      getMoviePageList={this.state.moviePageList}
                    />
                  );
                }}
              />
              <Route component={HomePage} />
            </Switch>
          </Container>
        </Suspense>
      </>
    );
  }
}

export default App;
