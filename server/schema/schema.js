const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const Book = require('./../models/Book');
const Author = require('./../models/Author');

const saveMinimal = Model => body => {
  const Body = new Model(body);
  return Body.save().then(author => author);
};

const saveAuthor = saveMinimal(Author);
const saveBook = saveMinimal(Book);

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: ({ id }) => {
        // return authors.find(({ id: authorId }) => authorId === id);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType)
      // resolve: ({ id }) => books.filter(({ authorId }) => authorId === id)
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        // return books.find(({ id: bookId }) => bookId === id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        // return authors.find(({ id: authorId }) => authorId === id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        /* books */
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        /* authors */
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return saveAuthor(args);
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return saveBook(args);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
