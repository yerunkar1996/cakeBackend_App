const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const snacksmodel = require('../model/snackSchema')

//GET API -- READ ALL data
router.get('/',(req,res)=>{
  snacksmodel.find().then((mongoDBdata)=>{
        res.send(mongoDBdata)
        console.log(mongoDBdata)
    }).catch(err=>{
        console.log(err)
    })
})

//GET API -- Search particular data
router.get('/:id',(req,res)=>{
  snacksmodel.find({_id: req.params.id}).then((mongoDBdata)=>{
        res.send(mongoDBdata)
        console.log(mongoDBdata)
    }).catch(err=>{
        console.log(err)
    })
})


//POST API
router.post('/addproduct',(req,res)=>{
    addProduct = new snacksmodel({
      _id: new mongoose.Types.ObjectId,
      snacksname: req.body.prodName,
      snacksqty: req.body.prodQty,
      snacksprice: req.body.prodPrice,
      snacksimg: req.body.imgfile,
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
  router.delete('/deleteSnacks/:id',(req,res)=>{
      snacksmodel.deleteOne({_id: req.params.id}).then(()=>{
        res.status(201).json({msg:`id ${req.params.id} data is deleted`})
      }).catch(err =>{
        res.status(404).json({msg:err})
      })
    })
    
  


module.exports = router;
