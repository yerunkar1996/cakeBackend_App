const mongoose = require('mongoose')

const cakemodel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cakename: String,
    cakeqty: String,
    cakepr: Number,
    cakeimg: String,
    category: String
})

module.exports = mongoose.model('cakes',cakemodel)
