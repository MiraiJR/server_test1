const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ComicReaded = new Schema({
    name: {type: String},
    slug: {type: String},
    urlImage: {type: String}
})

const History = new Schema({
    ip: {type: String},
    comicHistory: [ComicReaded]
})

module.exports = mongoose.model('History', History)