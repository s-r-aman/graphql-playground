import React, { Component } from 'react';
import styled from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './Components/BookList/BookList';

const Body = styled.div`
  font-family: sans-serif;
`;

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Body>
          <h1>Reading List</h1>
          <BookList />
        </Body>
      </ApolloProvider>
    );
  }
}

export default App;
