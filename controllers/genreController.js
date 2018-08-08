const Genre = require('../models/genre'),
      Book = require('../models/book'),
      async = require('async')

/** 
 * Display a list of all genres
 * 
 * GET /catalog/genre/
 * @param {*} req 
 * @param {*} res 
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
 * 
 * GET /catalog/genre/:id
 * @param {*} req 
 * @param {*} res 
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
 * 
 * GET /catalog/genre/create
 * @param {*} req 
 * @param {*} res 
 */
exports.genre_create_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre create GET')

/** 
 * Handle genre create
 * 
 * POST /catalog/genre
 * @param {*} req 
 * @param {*} res 
 */
exports.genre_create_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre create POST')

/** 
 * Form to update genre
 * 
 * GET /catalog/genre/:id/edit
 * @param {*} req 
 * @param {*} res 
 */
exports.genre_update_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre update GET')

/** 
 * Handle genre update
 * 
 * PUT /catalog/genre/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.genre_update_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre update POST')

/** 
 * Form to delete genre
 * 
 * GET /catalog/genre/:id/delete
 * @param {*} req 
 * @param {*} res 
 */
exports.genre_delete_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre delete GET')

/** 
 * Handle genre delete
 * 
 * DELETE /catalog/genre/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.genre_delete_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre delete POST')