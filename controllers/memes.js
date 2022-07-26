const Meme = require('../models/meme');

module.exports = {
    index,
    show,
    create,
    new: newMeme,
    edit,
    update,
};

function update(req, res) {
    Meme.update(req.params.id, req.body);
    res.redirect(`/memes/${req.params.id}`);
}

function edit(req, res) {
    const meme = Movie.getOne(req.params.id);
    res.render('memes/edit', { meme });
}

function newMeme(req, res) {
    const validSources = Meme.schema.path('source').enumValues;
    res.render('memes/new', { title: 'Add Meme', validSources});
}

function create(req, res) {
    console.log(req.user)
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    const meme = new Meme(req.body);
    meme.save(function(err, meme) {
        console.log(meme)
        if (err) {
            console.log(err);
            return res.redirect('/memes/new');
        }
        res.redirect('/memes');
    });
}

function show(req, res) {
    Meme.findById(req.params.id, function(err, meme) {
        res.render('memes/show', { title: 'Meme Details', meme});
    });
}
function index(req, res) {
    Meme.find({}, function (err, memes) {
        res.render('memes/index', { memes });
    });
}