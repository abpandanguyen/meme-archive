const Meme = require('../models/meme');

module.exports = {
    index,
    show,
    create,
    new: newMeme,
};

function newMeme(req, res) {
    const validSources = Meme.schema.path('source').enumValues;
    res.render('memes/new', { title: 'Add Meme', validSources});
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const meme = new Meme(req.body);
    meme.save(function(err) {
        if (err) {
            console.log(err);
            return res.redirect('/memes/new');
        }
        res.redirect('/memes');
    });
}

function show(req, res) {
    Meme.findById(req.params.id, function(err, meme) {
        res.render('memes/show', { title: 'Meme Details'})
    })
}
function index(req, res) {
    Meme.find({}, function (err, memes) {
        res.render('memes/index', { memes });
    });
}