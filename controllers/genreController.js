const Genre = require('../models/genre')

/** 
 * Display a list of all genres
 * 
 * GET /catalog/genre/
 * @param {*} req 
 * @param {*} res 
 */
exports.genre_list = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre list')

/** 
 * Display an genre
 * 
 * GET /catalog/genre/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.genre_detail = (req, res) =>
  res.send('NOT IMPLEMENTED: Genre detail')

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