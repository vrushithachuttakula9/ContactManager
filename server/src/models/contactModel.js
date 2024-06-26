//src/models/contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    image: { 
        type: String,
        required: false, 
    },
});

module.exports = mongoose.model('Contact', ContactSchema);