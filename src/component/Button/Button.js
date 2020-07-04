import React from 'react';
import routes from '../../routes';

const Button = ({ location, history }) => (
  <button type="button" onClick={() => handleGoBack(location, history)}>
    Go back
  </button>
);

export default Button;

const handleGoBack = (location, history) => {
  //   if (location.state && location.state.from) {
  //     return history.push(location.state.from);
  //   }
  //   history.push(routes.home);

  history.push(location?.state?.from || routes.home);
};
