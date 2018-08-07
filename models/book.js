const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true
  },
  genre: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  }]
})

// Virtual for book's URL
BookSchema
.virtual('url')
.get(() => `/catalog/book/${this._id}`)

module.exports = mongoose.model('Book', BookSchema)