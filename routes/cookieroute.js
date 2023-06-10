const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const cookiesmodel = require('../model/cookieSchema')

//GET API -- READ ALL data
router.get('/',(req,res)=>{
  cookiesmodel.find().then((mongoDBdata)=>{
        res.send(mongoDBdata)
        console.log(mongoDBdata)
    }).catch(err=>{
        console.log(err)
    })
})

//GET API -- Search particular data
router.get('/:id',(req,res)=>{
  cookiesmodel.find({_id: req.params.id}).then((mongoDBdata)=>{
        res.send(mongoDBdata)
        console.log(mongoDBdata)
    }).catch(err=>{
        console.log(err)
    })
})

//POST API
router.post('/addproduct',(req,res)=>{
  addProduct = new cookiesmodel({
    _id: new mongoose.Types.ObjectId,
    cookiename: req.body.prodName,
    cookieqty: req.body.prodQty,
    cookieprice: req.body.prodPrice,
    cookieimg: req.body.imgfile,
    category: req.body.category
  })

  addProduct.save().then(()=>{
    res.status(201).json({msg:"Data added to mongoDB!"})
    console.log("Data added to mongoDB!")
  }).catch(err=>{
    console.log(err)
  })
})



//Delete API
router.delete('/deleteCookie/:id',(req,res)=>{
    cookiesmodel.deleteOne({_id: req.params.id}).then(()=>{
      res.status(201).json({msg:`id ${req.params.id} data is deleted`})
    }).catch(err =>{
      res.status(404).json({msg:err})
    })
  })
  


module.exports = router;

