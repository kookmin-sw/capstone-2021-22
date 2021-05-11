const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys')
const USERS = require('../models').USERS;
const PILLS = require('../models').PILLS;
const router = express.Router();

router.get('/test', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({
      "success": true
    });
  }
);






module.exports = router;
