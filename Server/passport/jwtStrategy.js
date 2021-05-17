const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {jwtkey} = require('../keys')
const USERS = require('../models').USERS;

const jwtStrategyOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtkey,
  };
  
  module.exports = () => {

    passport.use(new JwtStrategy(jwtStrategyOption, async (jwt_payload, done) => {
        
        try {
         
            const user = await USERS.findOne({ where: { id: jwt_payload.userId },  raw: true });

            console.log(jwt_payload.userId);

            if(user){
              return  done(null, user );
            }
            else{
                return  done(null, false );
            }
        } catch (error) {
            console.error(error);
            return  done(error);
          }
       
    }));

  }