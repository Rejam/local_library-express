const BookInstance = require('../models/bookinstance')
const Book = require('../models/book')
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/** 
 * Display a list of all bookinstances
 * GET /catalog/bookinstance/
 */
exports.bookinstance_list = (req, res, next) =>
  BookInstance.find()
    .populate('book')
    .exec((err, bookinstance_list) => {
      if (err) { return next(err) }
      res.render('bookinstance_list', {
        title: 'Book Instance List',
        bookinstance_list
      })
    })

/** 
 * Display an bookinstance
 * GET /catalog/bookinstance/:id
 */
exports.bookinstance_detail = (req, res, next) =>
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) { return next(err) }
      if (bookinstance === null) {
        const err = new Error('Book copy not found')
        // @ts-ignore
        err.status = 404
        return next(err)
      }
      res.render('bookinstance_detail', {
        title: 'Book',
        bookinstance
      })
    })

/** 
 * Form to create new bookinstance
 * GET /catalog/bookinstance/create
 */
exports.bookinstance_create_get = (req, res, next) =>
    Book.find({}, 'title', (err, book_list) => {
      if (err)
        next(err)
      res.render('bookinstance_form', {
        title: 'Create BookInstance',
        book_list
      })
    })

/** 
 * Handle bookinstance create
 * POST /catalog/bookinstance
 */
exports.bookinstance_create_post = [
  // Validate
  body('book', 'Must specify book.')
    .isLength({min: 1})
    .trim(),
  body('imprint', 'Must specify imprint')
    .isLength({min: 1})
    .trim(),
  body('due_back', 'Invalid date')
    .optional({ checkFalsy: true })
    .isISO8601(),

  // Sanitize
  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    const { book, imprint, status, due_back } = req.body
    const bookinstance = new BookInstance({
      book,
      imprint,
      status,
      due_back
    })

    if(!errors.isEmpty()) {
      Book.find({}, 'title', (err, book_list) => {
        if (err)
          next(err)
        res.render('bookinstance_form', {
          title: 'Create BookInstance',
          book_list,
          selected_book: bookinstance.book._id,
          errors: errors.array()
        })
        return
      })
    }
    else {
      bookinstance.save(err => {
        if (err)
          next(err)
        res.redirect(bookinstance.url)
      })
    }
  }
]

/** 
 * Form to update bookinstance
 * GET /catalog/bookinstance/:id/edit
 */
exports.bookinstance_update_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance update GET')

/** 
 * Handle bookinstance update
 * PUT /catalog/bookinstance/:id
 */
exports.bookinstance_update_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance update POST')

/** 
 * Form to delete bookinstance
 * GET /catalog/bookinstance/:id/delete
 */
exports.bookinstance_delete_get = (req, res, next) => {
  BookInstance.findById(req.params.id, (err, bookinstance) => {
    if (err)
      next(err)
    if (bookinstance === undefined)
      res.redirect('/catalog/bookinstances')
    res.render('bookinstance_delete', {
      title: 'Delete Book instance',
      bookinstance
    })
  })
}


/** 
 * Handle bookinstance delete
 * DELETE /catalog/bookinstance/:id
 */
exports.bookinstance_delete_post = (req, res, next) => {
  BookInstance.findById(req.body.bookinstanceid)
    .then((err, bookinstance) => {
      if (err)
        next(err)
      BookInstance.findByIdAndRemove(req.body.bookinstanceid)
        .then(err => {
          if (err)
            next(err)
          res.redirect('/catalog/bookinstances')
        })
    })
}
