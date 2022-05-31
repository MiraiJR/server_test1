const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const Comic = new Schema({
    name: {type: String},
    urlImage: {type: String},
    chapters: {type: Number},
    updateDateAt: {type: Date},
    status: {type: String, default: 'Đang cập nhật'},
    genre: {type: String, default: 'Đang cập nhật'},
    author: {type: String, minlength: 1, default: 'Đang cập nhật'},
    slug: {type: String, slug: 'name', unique: true },
    content: {type: String}
});

module.exports = mongoose.model('Comic', Comic)