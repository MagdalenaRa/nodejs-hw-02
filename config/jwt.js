const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/users');
require('dotenv').config();

console.log('JWT_KEY:', process.env.JWT_KEY);

const setJWTStrategy = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
  };

  const strategy = new JwtStrategy(jwtOptions, (payload, done) => {
    // Logika weryfikacji użytkownika
    User.findById(payload.id)
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(err => done(err, false));
  });

  passport.use(strategy);
};

module.exports = setJWTStrategy;
