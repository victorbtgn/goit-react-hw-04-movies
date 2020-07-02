import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'c628e1f4ee6d648cd246b11c1f5a031b';

const homePageApiRequest = () =>
  axios
    .get(`/trending/movie/week?api_key=${apiKey}`)
    .then(res => res.data.results)
    .catch(error => error);

export { homePageApiRequest };
