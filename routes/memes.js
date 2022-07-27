var express = require('express');
var router = express.Router();
const memesCtrl = require('../controllers/memes');
// Require auth middleware
const isLoggedIn = require('../config/auth');

// GET /memes
router.get('/', memesCtrl.index);
// GET /memes
router.get('/favorites', memesCtrl.showFavorites);
// GET /memes/new
router.get('/new', isLoggedIn, memesCtrl.new);
// GET /memes/:id
router.get('/:id', memesCtrl.show);
// GET /memes/:id/edit
router.get('/:id/edit', isLoggedIn, memesCtrl.edit);
// POST /memes
router.post('/', memesCtrl.create);
// POST /memes/favorites
router.post('/:id/favorites', isLoggedIn, memesCtrl.addFavorite);
// DELETE
router.delete('/:id', isLoggedIn, memesCtrl.delete);

module.exports = router;