const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
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
      resolve: ({ authorId: _id }) => {
        return Author.findOne({ _id }).then(data => data);
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
      type: new GraphQLList(BookType),
      resolve: ({ id: authorId }) => Book.find({ authorId }).then(data => data)
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id: _id }) {
        return Book.findOne({ _id }).then(data => data);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id: _id }) {
        return Author.findOne({ _id }).then(data => data);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        return Book.find({}).then(data => data);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        return Author.find({}).then(data => data);
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        return saveAuthor(args);
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
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
