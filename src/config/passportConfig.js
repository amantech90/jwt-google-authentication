const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");
const ExtractJwt = require("passport-jwt").ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "somezebris";
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await User.findById(jwt_payload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);
