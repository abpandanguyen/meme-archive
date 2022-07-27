var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');
// Require auth middleware
const isLoggedIn = require('../config/auth');


// POST /memes/:id/comments
router.post('/memes/:id/comments', isLoggedIn, commentsCtrl.create);
// DELETE /memes/:id
router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete);

module.exports = router;