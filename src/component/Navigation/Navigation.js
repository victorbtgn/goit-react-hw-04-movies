import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.Navigation}>
    <NavLink
      exact
      to="/"
      className={styles.Link}
      activeClassName={styles.activeLink}
    >
      Home
    </NavLink>
    <NavLink
      to="/movies"
      className={styles.Link}
      activeClassName={styles.activeLink}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
