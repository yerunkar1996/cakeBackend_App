const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const cakemodel = require('../model/cakeSchema')


//GET API -- READ ALL data
router.get('/',(req,res)=>{
    cakemodel.find().then((mongoDBdata)=>{
        res.send(mongoDBdata)
        console.log(mongoDBdata)
    }).catch(err=>{
        console.log(err)
    })
})


//GET API -- Search particular data
router.get('/:id',(req,res)=>{
  cakemodel.find({_id: req.params.id}).then((mongoDBdata)=>{
      res.send(mongoDBdata)
      console.log(mongoDBdata)
  }).catch(err=>{
      console.log(err)
  })
})



// //Multer library & path library for upload files
const multer = require('multer')
const path = require('path')

// Set up storage destination for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the folder where you want to store the images
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Set up multer middleware
const upload = multer({ storage: storage });


//POST API
router.post('/addproduct',upload.single('imgfile'), function(req,res){

  const imagePath = req.body.imgfile.path;
  // const imageName = req.file.filename;
  console.log(req.body.imgfile,imagePath)
  
  addProduct = new cakemodel({
    _id: new mongoose.Types.ObjectId,
    cakename: req.body.prodName,
    cakeqty: req.body.prodQty,
    cakepr: req.body.prodPrice,
    cakeimg: req.body.imgfile,
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
router.delete('/deleteCakes/:id',(req,res)=>{
  cakemodel.deleteOne({_id: req.params.id}).then(()=>{
    res.status(201).json({msg:`id ${req.params.id} data is deleted`})
  }).catch(err =>{
    res.status(404).json({msg:err})
  })
})




module.exports = router;

