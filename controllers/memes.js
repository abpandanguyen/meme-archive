const Meme = require('../models/meme');
const User = require('../models/user');

module.exports = {
    index,
    show,
    create,
    new: newMeme,
    edit,
    update,
    addFavorite,
    showFavorites,
    showPosts,
    delete: deleteMeme,
};

function deleteMeme(req, res) {
    Meme.findOneAndDelete(
        {_id: req.params.id, user: req.user._id}, function(err) {
            res.redirect('/memes');
        }
    ); 
}

async function showPosts(req, res) {
    let user = await User.findById(req.user._id)
    let memes = await Meme.find({user: user._id})
    memes.sort((a, b) => a.dateOrigin - b.dateOrigin);
    res.render('memes/posts', { memes });
}


function showFavorites(req, res) {
    Meme.find({favoritedBy: req.user._id}, function (err, memes) {
        memes.sort((a, b) => a.dateOrigin - b.dateOrigin);
        res.render('memes/favorites', { memes });
    });
}

function addFavorite(req, res) {
    Meme.findById(req.params.id, function(err, m) {
        if (m.favoritedBy.includes(req.user._id)) {
            m.favoritedBy.remove(req.user._id);
        } else {
            m.favoritedBy.push(req.user._id);
        }
        m.save(function(err, meme) {
            if (err) {
                console.log(err);
                return res.redirect(`/memes/${req.params.id}`);
            }
            res.redirect(`/memes/${req.params.id}`);
        });
    });
}

function update(req, res) {
    Meme.findOneAndUpdate(
        {_id: req.params.id, user: req.user._id}, 
        req.body,
        {new: true},
        function(err, meme) {
            if (err || !meme) return res.redirect('/memes');
            res.redirect(`/memes/${meme._id}`);
        }
    );
}

function edit(req, res) {
    const validSources = Meme.schema.path('source').enumValues;
    const m = Meme.findOne({_id: req.params.id, user: req.user._id}, function(err, meme) {
        if (err || !meme) return res.redirect('/memes');
        res.render('memes/edit', { meme, validSources });
    });
}

function newMeme(req, res) {
    const validSources = Meme.schema.path('source').enumValues;
    res.render('memes/new', { title: 'Add Meme', validSources});
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    const meme = new Meme(req.body);
    meme.save(function(err, meme) {
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
        memes.sort((a, b) => a.dateOrigin - b.dateOrigin);
        res.render('memes/index', { memes });
    });
}