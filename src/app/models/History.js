const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ComicReaded = new Schema({
    name: {type: String, unique: true},
    slug: {type: String, unique: true},
    urlImage: {type: String}
})

const History = new Schema({
    ip: {type: String, unique: true},
    comicHistory: [ComicReaded]
})

module.exports = mongoose.model('History', History)