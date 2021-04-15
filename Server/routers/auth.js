const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys')
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middlewares');
const USERS = require('../models').USERS;


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
      return res.status(401).send({ error: `${info.message}` })
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const token = jwt.sign({ userId: user.id }, jwtkey);

      res.status(200).json(
        {
          "token": token,
          "name": user.name,
          "pill": "8"
        }
      );
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
