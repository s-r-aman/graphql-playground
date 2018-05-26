import React, { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';

import { getBooksQuery, getAuthorsQuery, addBookMutation } from './../query';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }
  displayAuthor = () => {
    const {
      getAuthorsQuery: { loading, authors }
    } = this.props;
    if (loading) {
      return <option disabled>Authors is loading ...</option>;
    }
    return (
      <Fragment>
        {authors.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Fragment>
    );
  };

  submitForm = () => {
    this.props.addBookMutation({
      variables: this.state,
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <label>Book name:</label>
        <input
          type="text"
          placeholder="Enter the book name."
          onChange={({ target: { value: name } }) => {
            this.setState(() => ({ name }));
          }}
        />
        <br />
        <label>Genre:</label>
        <input
          type="text"
          placeholder="Genre"
          onChange={({ target: { value: genre } }) => {
            this.setState(() => ({ genre }));
          }}
        />
        <br />
        <label>Author:</label>
        <select
          name="author"
          onChange={({ target: { value: authorId } }) => {
            this.setState(() => ({ authorId }));
          }}
        >
          <option>Select the author.</option>
          {this.displayAuthor()}
        </select>
        <button type="submit">Add Book</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
