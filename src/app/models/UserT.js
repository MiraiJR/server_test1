const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    email: {type: String},
    type: {type: String, default: 'user'},
    libraryComic: {type: [String], default: []}
});

module.exports = mongoose.model('User', User)