import React, { Component, Fragment as Frag } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from './../query';

import BookDetail from './../BookDetail/BookDetail';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }
  displayBook = () => {
    const {
      data: { loading, books }
    } = this.props;
    if (loading) {
      return <div>Data is loading ...</div>;
    }
    return (
      <ul>
        {books.map(({ name, id }) => (
          <li key={id}>
            <a
              onClick={e => {
                e.preventDefault();
                this.setState(() => ({ selected: id }));
              }}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    );
  };
  render() {
    return (
      <Frag>
        {this.displayBook()}
        <BookDetail id={this.state.selected} />
      </Frag>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
