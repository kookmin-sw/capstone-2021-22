const express = require('express');
const passport = require('passport');
const PILLS = require('../models').PILLS;

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }),
    async (req, res) =>{
        try {
            

        } catch {
            console.error(error);
            done(error);
        }
    
    });
  }
);


module.exports = router;
