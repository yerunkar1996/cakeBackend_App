const mongoose = require('mongoose')

const cookiemodel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cookiename: String,
    cookieqty: String,
    cookieprice: Number,
    cookieimg: String,
    category: String
})

module.exports = mongoose.model('cookies',cookiemodel)
