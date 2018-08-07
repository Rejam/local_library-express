const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  last_name: {
    type: String,
    required: true,
    max: 100
  },
  dob: Date,
  dod: Date
})

// Virtual for full name
AuthorSchema
.virtual('name')
.get(() => `${this.last_name}, ${this.first_name}`)

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(() => `/catalog/author/${this._id}`)

module.exports = mongoose.model('Author', AuthorSchema)