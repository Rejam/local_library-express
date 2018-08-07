const Author = require('../models/author')

/** 
 * Display a list of all authors
 * 
 * GET /catalog/author/
 * @param {*} req 
 * @param {*} res 
 */
exports.author_list = (req, res) =>
  res.send('NOT IMPLEMENTED: Author list')

/** 
 * Display an author
 * 
 * GET /catalog/author/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.author_detail = (req, res) =>
  res.send('NOT IMPLEMENTED: Author detail')

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