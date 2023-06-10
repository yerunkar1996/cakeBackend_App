const mongoose = require('mongoose')

const snacksmodel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    snacksname: String,
    snacksqty: Number,
    snacksprice: Number,
    snacksimg: String,
    category: String
})

module.exports = mongoose.model('snacks',snacksmodel)
