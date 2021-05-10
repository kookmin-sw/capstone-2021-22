const express = require('express');
const passport = require('passport');
const PILLS = require('../models').PILLS;
const { promises: fs } = require("fs");
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ps ='./test.png';

router.get('/',  async (req, res) => {
   
   const { pillName } = req.body;



    try {

    const pillInfo = await PILLS.findAll({where : {name:{[Op.like]: `%${pillName}%` }}, raw: true} );
    
    for(let i = 0;i<Object.keys(pillInfo).length;i++){
        
        pillInfo[i].image= await fs.readFile(__dirname + '/images'+'/'+pillInfo[i].id+'.jpg',              //파일 읽기
             (err, data) =>
            {
                console.log(data)
                return data;
    
            }
        )
    }
    
    
    res.json(pillInfo);

    }
    catch {
        console.error(error);
         done(error);
    }


    });
  



module.exports = router;
