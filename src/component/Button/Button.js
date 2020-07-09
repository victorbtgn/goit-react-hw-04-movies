import React from 'react';
import routes from '../../routes';
import styles from './Button.module.css';

const Button = ({ location, history }) => {
  return (
    <button
      type="button"
      onClick={() => handleGoBack(location, history)}
      className={styles.Button}
    >
      Go back
    </button>
  );
};

export default Button;

const handleGoBack = (location, history) => {
  //   if (location.state && location.state.from) {
  //     return history.push(location.state.from);
  //   }
  //   history.push(routes.home);

  history.push(location?.state?.from || routes.home);
};
