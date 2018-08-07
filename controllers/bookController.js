const Book = require('../models/book')

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
    .exec((err, books) => {
      if (err) { return next(err) }
      res.render('book_list', {
        title: 'Book List',
        book_list: books
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
exports.book_detail = (req, res) =>
  res.send('NOT IMPLEMENTED: Book detail')

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