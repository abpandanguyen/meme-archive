const Meme = require('../models/meme');

module.exports = {
    index,
    show,
    create,
    new: newMeme,
    edit,
    update,
    addFavorite,
    showFavorites,
    delete: deleteMeme,
};

async function deleteMeme(req, res, next) {
    // console.log("hello")
    try {
        const meme = await Meme.findOne({'memes._id': req.params.id, 'memes.user': req.user._id});
        if (!meme) throw new Error('Nice Try!');
        // Remove the comment using the remove method on Mongoose arrays
        meme.remove(req.params.id);
        await meme.save();
        res.redirect("/memes");
      } catch (err) {
        return next(err);
      }
}

function showFavorites(req, res) {
    Meme.find({favoritedBy: req.user._id}, function (err, memes) {
        res.render('memes/favorites', { memes });
    });
}

function addFavorite(req, res) {
    Meme.findById(req.params.id, function(err, m) {
        console.log(m)
        if (m.favoritedBy.includes(req.user._id)) {
            m.favoritedBy.remove(req.user._id);
        } else {
            m.favoritedBy.push(req.user._id);
        }
        m.save(function(err, meme) {
            console.log(meme)
            if (err) {
                console.log(err);
                return res.redirect(`/memes/${req.params.id}`);
            }
            res.redirect(`/memes/${req.params.id}`);
        });
    });
}

function update(req, res) {
    Meme.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/memes/${req.params.id}`);
}

function edit(req, res) {
    const meme = Meme.findOne(req.params.id);
    const validSources = Meme.schema.path('source').enumValues;
    res.render('memes/edit', { meme, validSources });
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