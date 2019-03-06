const timestamp = require('mongoose-timestamp');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true

    }
});

UserSchema.plugin(timestamp);

const User = mongoose.model('User', UserSchema);
module.exports = User;