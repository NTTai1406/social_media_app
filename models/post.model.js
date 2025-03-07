const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    post_content: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    post_image: {
        type: String,
        default: 'default.jpg'
    },
    post_author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_comments: {
        type: Array,
        default: []
    }
}, { timestamps: true, collection: 'posts' });

module.exports = mongoose.model('Post', postSchema);