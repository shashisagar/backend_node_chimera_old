const express = require('express');

const User = require('../models/user');
const auth = require('../controllers/auth');

const router = express.Router();

router.route('/').post((req, res) => {
  const user = new User();

  user.email = req.body.email;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.phone = req.body.phone;

  user.save((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.setHeader('User', `/user/${user.id}`);
      res.status(201).json(user);
    }
  });
});

// router.route('/:id').get(auth.authenticateUser, (req, res) => {
//   if (req.params.id !== req.user.id) {
//     res.sendStatus(401);
//   } else {
//     User.findById(req.params.id).populate('primaryLocation')
//       .exec((err, user) => {
//         if (user && !err) {
//           res.json(user);
//         } else {
//           res.sendStatus(404);
//         }
//       });
//   }
// });

// router.route('/:id').put(auth.authenticateUser, (req, res) => {
//   if (req.params.id !== req.user.id) {
//     res.sendStatus(401);
//   } else {
//     User.findById(req.params.id)
//       .exec((err, user) => {
//         if (err || !user) {
//           res.sendStatus(404);
//         } else {
//           user.firstName = req.body.firstName || user.firstName;
//           user.lastName = req.body.lastName || user.lastName;
//           user.phone = req.body.phone || user.phone;

//           user.save((err) => {
//             if (err) {
//               console.log("Error", err)
//               res.status(400).json(err);
//             } else {
//               res.status(201).json(user);
//             }
//           });
//         }
//       });
//   }
// });

router.route('/userList').get((req, res) => {
  User.find({}, function(err, users) {
    res.status(201).json(users);
  });
});

module.exports = router;
