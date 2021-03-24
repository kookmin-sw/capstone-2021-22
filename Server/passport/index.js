const passport = require('passport');
const local = require('./localStrategy');
const jwt = require('./jwtStrategy');
const USERS = require('../models').USERS;
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    USERS.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  jwt();
  local();
 
};