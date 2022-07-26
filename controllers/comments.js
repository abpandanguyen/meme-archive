const Meme = require('../models/meme');

module.exports = {
    create,
}

function create(req, res) {
    Meme.findById(req.params.id, function(err, meme) {
        req.body.userName = req.user.name;
        req.body.user = req.user._id;

        meme.comments.push(req.body);
        meme.save(function(err) {
            res.redirect(`/memes/${meme._id}`);
        });
    });
}