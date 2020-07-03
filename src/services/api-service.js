import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'c628e1f4ee6d648cd246b11c1f5a031b';

const getApiTrendingFilms = () =>
  axios
    .get(`/trending/movie/week?api_key=${apiKey}`)
    .then(res => res.data.results)
    .catch(error => error);

const getApiFilmById = id =>
  axios
    .get(`/movie/${id}?api_key=${apiKey}&language=en-US`)
    .then(res => res.data)
    .catch(error => error);

const getApiFilmCredit = id =>
  axios
    .get(`/movie/${id}/credits?api_key=${apiKey}`)
    .then(res => res.data.cast)
    .catch(error => error);

const getApiFilmReviews = id =>
  axios
    .get(`movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`)
    .then(res => res.data.results)
    .catch(error => error);

export {
  getApiTrendingFilms,
  getApiFilmById,
  getApiFilmCredit,
  getApiFilmReviews,
};
