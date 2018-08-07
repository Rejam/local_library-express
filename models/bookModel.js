const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const BookSchema = new Schema({
  title: String,
  author: [{
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }],
  summary: String,
  ISBN: String,
  genre: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  url: String
})

module.exports = mongoose.model('Book', BookSchema)