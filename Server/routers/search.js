const express = require('express');
const passport = require('passport');
const PILLS = require('../models').PILLS;
const FAVORITES = require('../models').FAVORITES;
const { promises: fs } = require("fs");
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ps ='./test.png';

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
   
   const  pillName  = req.query.pillName;



    try {
    const favorites =  await FAVORITES.findAll({where : {  user_id:req.user.id  }, raw: true} );

    const flist = []

    for(let i = 0;i<Object.keys(favorites).length;i++){
        flist.push(favorites[i].pill_id);
    }


    const pillInfo = await PILLS.findAll({where : {name:{[Op.like]: `%${pillName}%` }}, raw: true} );

    
    for(let i = 0;i<Object.keys(pillInfo).length;i++){
        
        pillInfo[i].image= await fs.readFile(__dirname + '/images'+'/'+pillInfo[i].id+'.jpg',              //파일 읽기
             (err, data) =>
            {
                console.log(data)
                return data;
    
            }
        )

        pillInfo[i].isFavorite = (flist.indexOf(pillInfo[i].id) < 0) ? false : true;
    }
    
  
    res.json(pillInfo);

    }
    catch(error) {
        console.error(error);
         done(error);
    }


    });
  



module.exports = router;
