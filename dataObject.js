const mongoose = require('mongoose');

const dataObjectSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('DataObject', dataObjectSchema);
