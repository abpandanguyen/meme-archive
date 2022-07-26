var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');


// POST /memes/:id/comments
router.post('/memes/:id/comments', commentsCtrl.create);
// DELETE /memes/:id
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;