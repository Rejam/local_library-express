const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance')

const async = require('async')

/**
 * Display Site Home Page
 * 
 * GET /
 */
exports.index = (req, res) =>
  async.parallel(
    {
      book_count: cb => 
        Book.countDocuments({}, cb),
      book_instance_count: cb =>
        BookInstance.countDocuments({}, cb),
      book_instance_available_count: cb =>
        BookInstance.countDocuments({status: 'Available'}, cb),
      author_count: cb =>
        Author.countDocuments({}, cb),
      genre_count: cb =>
        Genre.countDocuments({}, cb)
    },
  (err, results) => 
    res.render('index', {
      title: 'Local Library Home',
      error: err,
      data: results
    }
  )
)