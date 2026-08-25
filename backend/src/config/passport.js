const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');

passport.use(new JwtStrategy(
  { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.userId);
      return user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
));

module.exports = passport;