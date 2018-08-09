const Genre = require('../models/genre'),
      Book = require('../models/book'),
      async = require('async'),
      { body, validationResult } = require('express-validator/check'),
      { sanitizeBody } = require('express-validator/filter')

/** 
 * Display a list of all genres
 * GET /catalog/genre/
 */
exports.genre_list = (req, res, next) =>
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, genre_list) => {
      if (err) { return next(err) }
      res.render('genre_list', {
        title: 'Genre List',
        genre_list
      })
    })

/** 
 * Display a genre
 * GET /catalog/genre/:id
 */
exports.genre_detail = (req, res, next) =>
  async.parallel({
    genre: cb =>
      Genre.findById(req.params.id)
        .exec(cb)
    ,
    genre_books: cb =>
      Book.find({'genre': req.params.id})
        .exec(cb)
  }, (err, results) => {
    if (err) { return next(err) }
    if (results.genre === null) {
      const err = new Error('Genre not found')
      // @ts-ignore
      err.status = 404
      return next(err)
    }
    res.render('genre_detail', {
      title: 'Genre Detail',
      genre: results.genre,
      genre_books: results.genre_books
    })
  })

/** 
 * Form to create new genre
 * GET /catalog/genre/create
 */
exports.genre_create_get = (req, res) =>
  res.render('genre_form', { title: 'Create Genre '})

/** 
 * Handle genre create
 * POST /catalog/genre
 */
exports.genre_create_post = [

  // validate non-empty name
  body('name', 'Genre name required').isLength({min: 1}).trim(),

  // Sanitize name
  sanitizeBody('name').trim().escape(),

  // Following validation and sanitization
  (req, res, next) => {
    
    // Extract errors from req
    const errors = validationResult(req)

    // Create genre with sanitized data
    const genre = new Genre({ name: req.body.name })

    if (!errors.isEmpty()) {
      // There are errors. Rerender with sanitized data and/or errors
      res.render('genre_form', {
        title: 'Create Genre',
        genre,
        errors: errors.array()
      })
      return
    }
    else {
      // Data is valid
      // Check if genre already exists
      Genre.findOne({'name': req.body.name}, (err, found_genre) => {
        if (err) { return next(err) }
        else if (found_genre) { res.redirect(found_genre.url) }
        else {
          genre.save(err => {
            if(err){ return next(err)}
            res.redirect(genre.url)
          })
        }
      })
    }
  }
]  

/** 
 * Form to update genre
 * GET /catalog/genre/:id/edit
 */
exports.genre_update_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre update GET')

/** 
 * Handle genre update
 * PUT /catalog/genre/:id
 */
exports.genre_update_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre update POST')

/** 
 * Form to delete genre
 * GET /catalog/genre/:id/delete
 */
exports.genre_delete_get = (req, res, next) =>
  async.parallel({
    genre: cb =>
      Genre.findById(req.params.id, cb),
    // References Book
    books: cb =>
      Book.find({'genre': req.params.id}, cb)
  },
  (err, results) => {
    if(err)
      next(err)
    if(results.genre === null)
      res.redirect('/catalog/genres')
    
    const {genre, books} = results
    res.render('genre_delete', {
      title: 'Delete Genre',
      genre,
      books
    })
  }
)

/** 
 * Handle genre delete
 * POST /catalog/genre/:id
 */
exports.genre_delete_post = (req, res, next) =>
  async.parallel({
    genre: cb =>
      Genre.findById(req.body.genreid, cb),
    books: cb =>
      Book.find({'genre': req.body.genreid}, cb)
  },
  (err, results) => {
    if (err)
      next(err)

    if (results.books.length > 0) {
      const { genre, books } = results
      res.render('genre_delete', {
        title: 'Delete Genre',
        genre,
        books
      })
    }
    Genre.findByIdAndRemove(req.body.genreid, err => {
      if (err)
        next(err)
      res.redirect('/catalog/genres')
    })
  }
)
