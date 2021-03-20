const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../keys')
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middlewares');
const USERS = require('../models').USERS;

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { name, nick, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 12);
    await USERS.create({
      name,
      nick,
      password: hash,
    });
    res.send('join success');
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
      return res.status(422).send({error :`${info.message}`})
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const token = jwt.sign({userId:user.id},jwtkey);
      console.log(user.id);
      res.send({token});
    });
  })(req, res, next); 
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});



module.exports = router;
