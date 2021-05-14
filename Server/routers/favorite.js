const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys')
const USERS = require('../models').USERS;
const PILLS = require('../models').PILLS;
const FAVORITES = require('../models').FAVORITES;
const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { pillId, isFavorite } = req.body;

    try {
    if (isFavorite) {

      await FAVORITES.create({
        pill_id: parseInt(199303108) ,
        user_id: parseInt(7),
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






module.exports = router;
