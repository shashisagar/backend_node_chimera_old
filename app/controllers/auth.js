const passport = require('passport');
const passportJWT = require('passport-jwt');
const BasicStrategy = require('passport-http').BasicStrategy;

const config = require('../config/config.js').get(process.env.NODE_ENV);

const User = require('../models/user');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.jwt.key;

// headers: { Authorization: 'JWT ' + token }
passport.use('user-jwt', new JwtStrategy(jwtOptions, (jwtPayload, callback) => {
  console.log("-=-=-==- ", jwtPayload);
  User.findById(jwtPayload.data.id)
    .exec((err, user) => {
      if (user && !err) {
        console.log(`JWT: User ${user.id} authenticated`);
        callback(null, user.toJSON());
      } else if (err) {
        console.log('JWT: Error finding User', { err });
        callback(err, false);
      } else {
        console.log('JWT: User not found');
        callback(null, false);
      }
    });
}));

// btoa(username + ':' + password) // headers: { Authorization: 'Basic ' + token }
passport.use('user-basic', new BasicStrategy((email, password, callback) => {
  if (email) {
    email = email.toLowerCase();
    email = email.trim();
  }
  User.findOne({ email }, (err, user) => {
    if (user && !err) {
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          console.log(`Basic: User ${user.id} authenticated`)
          callback(null, user.toJSON());
        } else if (err) {
          console.log('Basic: Error comparing password', { err });
          callback(err, false);
        } else {
          console.log('Basic: Email and password did not match', { email });
          callback(null, false);
        }
      });
    } else if (err) {
      console.log('Basic: Error finding User', { err });
      callback(err, false);
    } else {
      console.log('Basic: User not found', { email });
      callback(null, false);
    }
  });
}));

exports.jwt = jwtOptions;
exports.basicUser = passport.authenticate('user-basic', { session: false });
// exports.authenticateUser = passport.authenticate(['user-jwt', 'user-basic'], { session: false });

exports.authenticate = function (req, res, next) {
  console.log(req.body, req.query, req.headers)
  if (req.headers && req.headers['user-id']) {
    req.user = {name: "ganesha"}
    next()
  }
  else
    res.sendStatus(401)
  // next()
};

