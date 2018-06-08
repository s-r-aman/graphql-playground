import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { getBookQuery } from './../query';

class BookDetails extends Component {
  displayBookDetail = () => {
    const { book } = this.props.data;
    if (book) {
      const {
        name,
        genre,
        author: { name: authorName, books: authorBooks }
      } = book;
      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{authorName}</p>
          <p>All of the books by this author are - </p>
          <ul>{authorBooks.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
        </div>
      );
    }
    return <p>NO BOOK SELECTED!</p>;
  };

  render() {
    return this.displayBookDetail();
  }
}

BookDetails.propTypes = {
  data: PropTypes.shape({
    book: PropTypes.shape({
      name: PropTypes.string,
      genre: PropTypes.string,
      author: PropTypes.shape({
        name: PropTypes.string,
        books: PropTypes.array
      })
    })
  }).isRequired
};

export default graphql(getBookQuery, {
  options: ({ id }) => ({ variables: { id } })
})(BookDetails);
