const express = require('express');
const jwt = require('jsonwebtoken');

const auth = require('../controllers/auth');

const User = require('../models/user');

const router = express.Router();

router.route('/login').post((req, res, next) => {
 let email = req.body.email;
 let password = req.body.password;

  User.findOne({ email }, (err, user) => {
    if (user && !err) {
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          let payload = {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user.toJSON()
          }
          const token = jwt.sign(payload, auth.jwt.secretOrKey);
          res.json({ token, user });
        } else if (err) {
          console.log('Basic: Error comparing password', { err });
          next()
        } else {
          console.log('Basic: Email and password did not match', { email });
          next()
        }
      });
    } else if (err) {
      console.log('Basic: Error finding User', { err });
      next()
    } else {
      console.log('Basic: User not found', { email });
      next()
    }
  });
});

module.exports = router;
