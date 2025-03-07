const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    user_last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    user_email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    user_date_of_birth: {
        type: Date,
        default: Date.now
    },
    user_age: {
        type: Number,
        required: true,
        min: 5,
        max: 100
    },
    user_contacts: {
        type: Object,
    },
    user_gender: {
        type: Number,
        enum: [0, 1, 2], //0 = Nam, 1 = Nữ, 2 = Khác
        default: 2
    },
    user_id_card: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 12
    },
    user_avatar: {
        type: String,
        default: 'default.jpg'
    },
    user_major: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    user_posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, {
    timestamps: true,
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);