const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        match: /.{5,}/
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

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
    userAvatar: String,
    comments: [commentSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Meme', memeSchema);