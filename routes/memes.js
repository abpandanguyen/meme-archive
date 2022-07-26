var express = require('express');
var router = express.Router();
const memesCtrl = require('../controllers/memes');
// Require auth middleware
const isLoggedIn = require('../config/auth');

// GET /memes
router.get('/', memesCtrl.index);
// GET /memes/new
router.get('/new', isLoggedIn, memesCtrl.new);
// GET /memes/:id
router.get('/:id', memesCtrl.show);
// GET /memes/:id/edit
router.get('/:id/edit', memesCtrl.edit);
// POST /memes
router.post('/', memesCtrl.create);

module.exports = router;