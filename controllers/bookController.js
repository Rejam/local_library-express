const Book = require('../models/book'),
      BookInstance = require('../models/bookinstance'),
      Author = require('../models/author'),
      Genre = require('../models/genre'),
      async = require('async'),
      { body, validationResult } = require('express-validator/check'),
      { sanitizeBody } = require('express-validator/filter')

/** 
 * Display a list of all books
 * GET /catalog/book/
 */
exports.book_list = (req, res, next) =>
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, book_list) => {
      if (err)
        next(err)
      res.render('book_list', {
        title: 'Book List',
        book_list
      })
    }
  )

/** 
 * Display an book
 * GET /catalog/book/:id
 */
exports.book_detail = (req, res, next) =>
  async.parallel({

    book: cb =>
      Book.findById(req.params.id)
        .populate(['author','genre'])
        .exec(cb),

    book_instance: cb =>
      BookInstance.find({'book': req.params.id }, cb)

  }, (err, results) => {
    if (err) 
      next(err)
    if (results.book === null ) {
      const err = new Error('Book not found')
      // @ts-ignore
      err.status = 404
      return next(err)
    }
    res.render('book_detail', {
      title: 'Title',
      book: results.book,
      book_instances: results.book_instance
    })
  })

/** 
 * Form to create new book
 * GET /catalog/book/create
 */
exports.book_create_get = (req, res, next) =>
  async.parallel({
    authors: cb => Author.find(cb),
    genres: cb =>  Genre.find(cb)
  },
  (err, results) => {
    if(err)
      next(err)
    const { authors, genres } = results
    res.render('book_form', {
      title: 'Create Book',
      authors,
      genres
    })
  }
)

/** 
 * Handle book create
 * POST /catalog/book
 */
exports.book_create_post = [
  // Convert genre to array
  (req, res, next) => {
    if(!(req.body.genre instanceof Array)) {
        req.body.genre = req.body.genre ?
          [...[req.body.genre]] : []
    }
    next()
  },

  // Validate
  body('title', 'Must have a title')
    .isLength({min: 1})
    .trim(),
  body('author', 'Must have an author')
    .isLength({min: 1})
    .trim(),
  body('summary', 'Must have a summary')
    .isLength({min: 1})
    .trim(),
  body('isbn', 'Must have an ISBN')
    .isLength({min: 1})
    .trim(),

  // Sanitize
  sanitizeBody('*').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    const { title, author, summary, isbn, genre } = req.body
    const book = new Book({
      title,
      author,
      summary,
      isbn,
      genre
    })

    if(!errors.isEmpty()) {
      async.parallel({
        authors: cb => Author.find(cb),
        genres: cb => Genre.find(cb)
      },
      (err, results) => {
        if(err)
          next(err)

        results.genres.map(g => {
          if(book.genre.indexOf(g._id) > -1 ){
            g.checked='true'
          }
        })
        const { authors, genres } = results
        res.render('book_form', {
          title: 'Create Book',
          authors,
          genres,
          book,
          errors: errors.array()
        })
        return
      })
    }
    else {
      // Is valid. Save book
      book.save(err => {
        if(err)
          next(err)
        res.redirect(book.url)
      })
    }
  }
]

/** 
 * Form to update book
 * GET /catalog/book/:id/edit
 */
exports.book_update_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Book update GET')

/** 
 * Handle book update
 * PUT /catalog/book/:id
 */
exports.book_update_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Book update POST')

/** 
 * Form to delete book
 * GET /catalog/book/:id/delete
 */
exports.book_delete_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Book delete GET')

/** 
 * Handle book delete
 * DELETE /catalog/book/:id
 */
exports.book_delete_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Book delete POST')