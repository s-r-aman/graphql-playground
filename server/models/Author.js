const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const AuthorSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Author', AuthorSchema);
