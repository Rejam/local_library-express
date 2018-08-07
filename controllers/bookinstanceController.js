const Bookinstance = require('../models/bookinstance')

/** 
 * Display a list of all bookinstances
 * 
 * GET /catalog/bookinstance/
 * @param {*} req 
 * @param {*} res 
 */
exports.bookinstance_list = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance list')

/** 
 * Display an bookinstance
 * 
 * GET /catalog/bookinstance/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.bookinstance_detail = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance detail')

/** 
 * Form to create new bookinstance
 * 
 * GET /catalog/bookinstance/create
 * @param {*} req 
 * @param {*} res 
 */
exports.bookinstance_create_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance create GET')

/** 
 * Handle bookinstance create
 * 
 * POST /catalog/bookinstance
 * @param {*} req 
 * @param {*} res 
 */
exports.bookinstance_create_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance create POST')

/** 
 * Form to update bookinstance
 * 
 * GET /catalog/bookinstance/:id/edit
 * @param {*} req 
 * @param {*} res 
 */
exports.bookinstance_update_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance update GET')

/** 
 * Handle bookinstance update
 * 
 * PUT /catalog/bookinstance/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.bookinstance_update_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance update POST')

/** 
 * Form to delete bookinstance
 * 
 * GET /catalog/bookinstance/:id/delete
 * @param {*} req 
 * @param {*} res 
 */
exports.bookinstance_delete_get = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance delete GET')

/** 
 * Handle bookinstance delete
 * 
 * DELETE /catalog/bookinstance/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.bookinstance_delete_post = (req, res) =>
  res.send('NOT IMPLEMENTED: Bookinstance delete POST')