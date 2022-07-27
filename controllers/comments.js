const Meme = require('../models/meme');

module.exports = {
    create,
    delete: deleteComment,
};

function deleteComment(req, res, next) {
    // console.log("hello")
    try {
      const meme = await Meme.findOne({'comments._id': req.params.id, 'comments.user': req.user._id});
      if (!meme) throw new Error('Nice Try!');
      // Remove the comment using the remove method on Mongoose arrays
      meme.comments.remove(req.params.id);
      await meme.save();
      res.redirect(`/memes/${meme._id}`);
    } catch (err) {
      return next(err);
    }
}

function create(req, res) {
    // console.log("Hello") 
    Meme.findById(req.params.id, function(err, meme) {
        req.body.userName = req.user.name;
        req.body.user = req.user._id;

        meme.comments.push(req.body);
        meme.save(function(err) {
            res.redirect(`/memes/${meme._id}`);
        });
    });
}