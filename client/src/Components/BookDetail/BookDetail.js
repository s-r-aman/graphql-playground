import React, { Component } from 'react';
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
          <p>All of the books by this autor are - </p>
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

export default graphql(getBookQuery, {
  options: ({ id }) => ({ variables: { id } })
})(BookDetails);
