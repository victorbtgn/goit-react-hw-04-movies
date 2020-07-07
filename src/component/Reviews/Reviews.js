import React, { Component } from 'react';
import { getApiFilmReviews } from '../../services/api-service';
import ReviewsItem from './ReviewsItem';
import styles from './Reviews.module.css';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentWillMount() {
    getApiFilmReviews(this.props.id).then(reviews =>
      this.setState({ reviews: reviews }),
    );
  }

  render() {
    const { reviews } = this.state;

    return (
      <ul className={styles.Reviews}>
        {reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <ReviewsItem key={id} author={author} content={content} />
          ))
        ) : (
          <span>We don't have any reviews for this movie.</span>
        )}
      </ul>
    );
  }
}

export default Reviews;
