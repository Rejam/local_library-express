const Author = require('../models/author'),
      Book = require('../models/book'),
      async = require('async')

/** 
 * Display a list of all authors
 * 
 * GET /catalog/author/
 * @param {*} req 
 * @param {*} res 
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
 * 
 * GET /catalog/author/:id
 * @param {*} req 
 * @param {*} res 
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
 * 
 * GET /catalog/author/create
 * @param {*} req 
 * @param {*} res 
 */
exports.author_create_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Author create GET')

/** 
 * Handle author create
 * 
 * POST /catalog/author
 * @param {*} req 
 * @param {*} res 
 */
exports.author_create_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Author create POST')

/** 
 * Form to update author
 * 
 * GET /catalog/author/:id/edit
 * @param {*} req 
 * @param {*} res 
 */
exports.author_update_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Author update GET')

/** 
 * Handle author update
 * 
 * PUT /catalog/author/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.author_update_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Author update POST')

/** 
 * Form to delete author
 * 
 * GET /catalog/author/:id/delete
 * @param {*} req 
 * @param {*} res 
 */
exports.author_delete_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Author delete GET')

/** 
 * Handle author delete
 * 
 * DELETE /catalog/author/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.author_delete_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Author delete POST')