const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      moment = require('moment')

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  family_name: {
    type: String,
    required: true,
    max: 100
  },
  date_of_birth: Date,
  date_of_death: Date
})

// Virtual for full name
AuthorSchema
.virtual('name')
.get(function(){
  return `${this.family_name}, ${this.first_name}`
})

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function() {
  return `/catalog/author/${this._id}`
})

AuthorSchema
.virtual('dob')
.get(function() {
  return this.date_of_birth ?
    moment(this.date_of_birth).format('YYYY-MM-DD') :
    ''
})

AuthorSchema
.virtual('dod')
.get(function() {
  return this.date_of_death ?
    moment(this.date_of_death).format('YYYY-MM-DD') :
    ''
})

AuthorSchema
.virtual('lifespan')
.get(function() {
  return `${this.dob} - ${this.dod}`
})

module.exports = mongoose.model('Author', AuthorSchema)