const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const { mongoDBUri } = require('./config/config');

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(mongoDBUri);
mongoose.connection.once('open', () => console.log('Connected to Database'));

app.get('/', (req, res) => {
  res.send('Hello GraphQL');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => console.log('💻   Server is running -> 4000'));
