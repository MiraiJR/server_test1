const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    email: {type: String},
    type: {type: String, default: 'user'},
    libraryComic: {type: [String], default: []},
    avatar: {type: String, default: 'https://truyentranhlh.net/storage/images/thumb/7a1394bd-6889-4ff3-a130-14e5418f929c.jpg'}
});

module.exports = mongoose.model('User', User)