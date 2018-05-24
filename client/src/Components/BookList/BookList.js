import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

class BookList extends Component {
    displayBook = () => {
        const {
            data: { loading, books }
        } = this.props;
        if (loading) {
            return <div>Data is loading ...</div>;
        }
        return <ul>{books.map(({ name, id }) => <li key={id}>{name}</li>)}</ul>;
    };
    render () {
        return this.displayBook();
    }
}

export default graphql(getBooksQuery)(BookList);
