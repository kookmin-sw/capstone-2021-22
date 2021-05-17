const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys')
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middlewares');
const USERS = require('../models').USERS;
const FAVORITES = require('../models').FAVORITES;

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { name, nick, password, isExistId } = req.body;
  try {
    if (isExistId) {
      res.status(401).json({
        "join": false
      });
    }
    else {
      const hash = await bcrypt.hash(password, 12);
      await USERS.create({
        name,
        nick,
        password: hash,
      });
      res.status(200).json({
        "join": true
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json(
        {
          "isLogin":false,
        }
      );
    }
    
    return req.login(user,  async (loginError) => {
      try {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const token = jwt.sign({ userId: user.id }, jwtkey);
      const numOfPill = await FAVORITES.count({where: {
        user_id:user.id
      }});
      res.status(200).json(
        {
          "isLogin":true,
          "token": token,
          "name": user.name,
          "pill": numOfPill
        }
      );
      }
      catch {
        console.error(error);
    return next(error);
      }
    });
  })(req, res, next);
});



router.get('/test', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({
      "success": true
    });
  }
);

router.post('/isExistId', async (req, res, next) => {
  try {
    const exUser = await USERS.findOne({ where: { nick: req.body.nick } });
    if (exUser) {
      res.status(200).json(
        {
          "isExistId": true
        }
      )
    }
    else {
      res.status(401).json(
        {
          "isExistId": false
        }
      )
    }
  } catch {
    console.error(error);
    done(error);
  }
});


module.exports = router;
