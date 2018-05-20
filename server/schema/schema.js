const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const books = [
  {
    name: 'Internal Infrastructure Orchestrator',
    genre: 'Action',
    id: '1',
    authorId: '1'
  },
  {
    name: 'Dynamic Marketing Analyst',
    genre: 'Sci-Fi',
    id: '2',
    authorId: '2'
  },
  {
    name: 'Future Mobility Engineer',
    genre: 'Fantasy',
    id: '3',
    authorId: '3'
  },
  { name: 'Heathens', genre: 'Philisophy', id: '4', authorId: '2' },
  { name: 'Middle', genre: 'Romance', id: '5', authorId: '1' },
  { name: 'Desert thirst', genre: 'Fantasy', id: '6', authorId: '1' }
];

const authors = [
  { name: 'Ludie Strosin', age: 55, id: '1' },
  { name: 'Glenna Koelpin', age: 40, id: '2' },
  { name: 'Melyssa Klein', age: 37, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: ({ id }) => {
        return authors.find(({ id: authorId }) => authorId === id);
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
      resolve: ({ id }) => books.filter(({ authorId }) => authorId === id)
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
        return books.find(({ id: bookId }) => bookId === id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return authors.find(({ id: authorId }) => authorId === id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
