import React, { Component } from 'react';
import styles from './SearchBar.module.css';

class SearchBar extends Component {
  state = {
    query: '',
  };

  inputChange = ({ currentTarget: { value } }) => {
    this.setState({ query: value });
  };

  setQuery = evt => {
    evt.preventDefault();

    this.props.onSubmit(this.state.query);

    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <form onSubmit={this.setQuery} className={styles.form}>
        <input
          type="text"
          autoFocus
          autoComplete="off"
          onChange={this.inputChange}
          placeholder="Choose a movie title"
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
