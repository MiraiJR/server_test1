const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const chapter = new Schema({
    name: {type: String},
    numberChapter: {type: Number},
    slugComic: {type: String},
    slugChapter: {type: String},
    linkImage: {type: String},
    nextChapter: {type: String},
    preChapter: {type: String},
})

const Comic = new Schema({
    name: {type: String, unique: true},
    urlImage: {type: String},
    chapters: {type: Number, default: 0},
    status: {type: String, default: 'Đang cập nhật'},
    genre: {type: String, default: 'Đang cập nhật'},
    author: {type: String, minlength: 1, default: 'Đang cập nhật'},
    slug: {type: String, slug: 'name', unique: true },
    content: {type: String},
    country: {type: String, default: 'manga'},
    detailChapter: [chapter],
    createAt: {type: Date, default: new Date()},
    updateAt: {type: Date, default: new Date()},
});

module.exports = mongoose.model('Comic', Comic)