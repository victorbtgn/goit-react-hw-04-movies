import React from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './AppBar.module.css';

const AppBar = () => (
  <header className={styles.AppBar}>
    <Navigation />
  </header>
);

export default AppBar;
