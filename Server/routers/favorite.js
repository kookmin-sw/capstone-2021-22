const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys')
const USERS = require('../models').USERS;
const PILLS = require('../models').PILLS;
const FAVORITES = require('../models').FAVORITES;
const router = express.Router();
const { promises: fs } = require("fs");

router.post('/', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { pillId, isFavorite } = req.body;

    try {
    if (isFavorite) {

      await FAVORITES.create({
        pill_id: parseInt(pillId) ,
        user_id: parseInt(req.user.id),
      });
      res.status(200).json({
        "create": true
      });
    }
    else {
      await FAVORITES.destroy({where: {
        pill_id:pillId,
        user_id:req.user.id
      }});
      res.status(200).json({
        "delete": true
      });
    }
  }
  catch (error){
    console.error(error);
    return next(error);
  }
    
  }
);

router.get('/', passport.authenticate('jwt', { session: false }),
async (req, res, next)=> {
  try{
    const numOfPill = await FAVORITES.count({where: {
      user_id:req.user.id
    }});
    res.status(200).json({
      "numOfPill": numOfPill,
      "name":req.user.name
    });
  }
  catch {
    console.error(error);
    return next(error);
  }
    
  }
);

router.get('/my', passport.authenticate('jwt', { session: false }),

async (req, res, next)=> {
  const result = [];
  try{

    const favorites =  await FAVORITES.findAll({where : {  user_id:req.user.id  }, raw: true} );
   

    for(let i = 0;i<Object.keys(favorites).length;i++){
        result[i] = await PILLS.findOne({where : {  id: favorites[i].pill_id  }, raw: true} )
        result[i].image= await fs.readFile(__dirname + '/images'+'/'+favorites[i].pill_id +'.jpg',              //파일 읽기
             (err, data) =>
            {
                
                return data;
    
            }
        )
    }
    result.push(req.user.name);
    res.json(result);
  }
  catch {
    console.error(error);
    return next(error);
  }
    
  }
);




module.exports = router;
