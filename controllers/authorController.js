const Author = require('../models/author'),
      Book = require('../models/book'),
      async = require('async'),
      { body, validationResult } = require('express-validator/check'),
      { sanitizeBody } = require('express-validator/filter')


/** 
 * Display a list of all authors
 * GET /catalog/author/
 */
exports.author_list = (req, res, next) =>
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec((err, author_list) => {
      if (err) { return next(err)}
      res.render('author_list', {
        title: 'Author list',
        author_list
      })
    })

/** 
 * Display an author
 * GET /catalog/author/:id
 */
exports.author_detail = (req, res, next) =>
    async.parallel({
      author: cb =>
        Author.findById(req.params.id, cb)
      ,
      authors_books: cb =>
        Book.find({'author': req.params.id}, 'title summary', cb)
    },
    (err, results) => {
      if (err) { return next(err) }
      if (results.author === null) {
        const err = new Error('Author not found')
        // @ts-ignore
        err.status = 404
        return next(err)
      }
      res.render('author_detail', {
        title: 'Author Detail',
        author: results.author,
        authors_books: results.authors_books
      })
    }
  )

/** 
 * Form to create new author
 * GET /catalog/author/create
 */
exports.author_create_get = (req, res) =>
  res.render('author_form', {title: 'Create Author'})

/** 
 * Handle author create
 * POST /catalog/author
 */
exports.author_create_post = [
  body('first_name')
    .isLength({min: 1})
    .trim()
    .withMessage('First name is required.')
    .isAlphanumeric()
    .withMessage('First name container non-alphanumeric characters.'),
  body('family_name')
    .isLength({min: 1})
    .trim()
    .withMessage('Family name is required.')
    .isAlphanumeric()
    .withMessage('First name container non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601(),
  body('date_of_death', 'Invalid date of death')
    .optional({ checkFalsy: true })
    .isISO8601(),

  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('family_name').trim().escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty) { 
      res.render('author_form', {
        title: 'Create Author',
        author: req.body,
        errors: errors.array()
      })
      return
    }
    else {
      const { first_name, family_name, date_of_birth, date_of_death } = req.body
      const author = new Author({
        first_name,
        family_name,
        date_of_birth,
        date_of_death
      })
      author.save(err => {
        if (err) { return next(err) }
        res.redirect(author.url)
      })
    }
  }
]

/** 
 * Form to update author
 * GET /catalog/author/:id/edit
 */
exports.author_update_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Author update GET')

/** 
 * Handle author update
 * PUT /catalog/author/:id
 */
exports.author_update_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Author update POST')

/** 
 * Form to delete author
 * GET /catalog/author/:id/delete
 */
exports.author_delete_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Author delete GET')

/** 
 * Handle author delete
 * DELETE /catalog/author/:id
 */
exports.author_delete_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Author delete POST')