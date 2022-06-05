const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const User = new Schema({
    username: {type: String, unique: true},
    password: {type: String}
});

module.exports = mongoose.model('User', User)