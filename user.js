const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    // You can add additional fields here if needed
    email: {
        type: String,
        unique: true,
        required: true
    }
});

// This will add username and password fields to your schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
