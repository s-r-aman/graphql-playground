import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './Components/BookList/BookList';
import AddBooks from './Components/AddBooks/AddBooks';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>Reading List</h1>
          <BookList />
          <hr />
          <h1>Add Books</h1>
          <AddBooks />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
