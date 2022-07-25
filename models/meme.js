const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memeSchema = new Schema({
    link: {
        type: String,
    },
    source: {
        type: String,
        enum: ['Twitter', 'Instagram', 'TikTok', 'Facebook', 'Tumblr', 'Other']
    },
    dateOrigin: {
        type: Date,
    },
    description: {
        type: String,
        match: /.{15,}/
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Meme', memeSchema);