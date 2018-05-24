import React, { Component, Fragment } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

class AddBook extends Component {
    displayAuthor = () => {
        const {
            data: { loading, authors }
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
    render () {
        return (
            <form>
                <label>Book name:</label>
                <input type="text" placeholder="Enter the book name." />
                <br />
                <label>Genre:</label>
                <input type="text" placeholder="Genre" />
                <br />
                <label>Author:</label>
                <select name="author">
                    <option disabled>Select the author.</option>
                    {this.displayAuthor()}
                </select>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
