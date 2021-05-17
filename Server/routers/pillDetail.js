const express = require('express');
const passport = require('passport');
const PILLS = require('../models').PILLS;
const { promises: fs } = require("fs");
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const spawn = require('child_process').spawn;



router.post('/',  async (req, res) => {
   
    const { pillId}  = req.body;
 
    const result = spawn('python', [__dirname+'/crawler/crawl.py',pillId]);
    


  
    try {
        
        console.log("tt")
        result.stdout.on('data', function(data) { console.log(data.toString()); }); 
        console.log("ee")
        
   
    }
    catch(error) {
        console.error(error);
        done(error);
    }


    });
  



module.exports = router;
