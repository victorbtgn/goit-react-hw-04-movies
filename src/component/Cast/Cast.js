import React, { Component } from 'react';
import { getApiFilmCredit } from '../../services/api-service';
import CastItem from './CastItem';
import styles from './Cast.module.css';

class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    getApiFilmCredit(this.props.id).then(cast => {
      let filterCast = cast.filter(cast => cast.profile_path);
      this.setState({ cast: filterCast });
    });
  }

  render() {
    return (
      <ul className={styles.Cast}>
        {this.state.cast.map(({ profile_path, name, cast_id }) => (
          <CastItem key={cast_id} name={name} profilePath={profile_path} />
        ))}
      </ul>
    );
  }
}

export default Cast;
