const Book = require('../models/book'),
      BookInstance = require('../models/bookinstance'),
      async = require('async')

/** 
 * Display a list of all books
 * 
 * GET /catalog/book/
 * @param {*} req 
 * @param {*} res 
 */
exports.book_list = (req, res, next) =>
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, book_list) => {
      if (err) { return next(err) }
      res.render('book_list', {
        title: 'Book List',
        book_list
      })
    }
  )

/** 
 * Display an book
 * 
 * GET /catalog/book/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.book_detail = (req, res, next) =>
  async.parallel({
    book: cb =>
      Book.findById(req.params.id)
        .populate(['author','genre'])
        .exec(cb)
    ,
    book_instance: cb =>
      BookInstance.find({'book': req.params.id })
      .exec(cb)
  }, (err, results) => {
    if (err) { return next(err) }
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
 * 
 * GET /catalog/book/create
 * @param {*} req 
 * @param {*} res 
 */
exports.book_create_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Book create GET')

/** 
 * Handle book create
 * 
 * POST /catalog/book
 * @param {*} req 
 * @param {*} res 
 */
exports.book_create_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Book create POST')

/** 
 * Form to update book
 * 
 * GET /catalog/book/:id/edit
 * @param {*} req 
 * @param {*} res 
 */
exports.book_update_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Book update GET')

/** 
 * Handle book update
 * 
 * PUT /catalog/book/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.book_update_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Book update POST')

/** 
 * Form to delete book
 * 
 * GET /catalog/book/:id/delete
 * @param {*} req 
 * @param {*} res 
 */
exports.book_delete_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Book delete GET')

/** 
 * Handle book delete
 * 
 * DELETE /catalog/book/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.book_delete_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Book delete POST')