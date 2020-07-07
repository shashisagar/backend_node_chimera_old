const express = require('express');

const Location = require('../models/user-location');
const User = require('../models/user');
const auth = require('../controllers/auth');

const router = express.Router();

// router.route('/:userId/location').get(auth.authenticateUser, (req, res) => {
//   if (req.user.id !== req.params.userId) {
//     res.sendStatus(401);
//   } else {
//     const query = Location.find();
//     query.where('user', req.params.userId);

//     query.exec((err, locations) => {
//       if (err) {
//         res.sendStatus(404);
//       } else {
//         res.json(locations);
//       }
//     });
//   }
// });

// router.route('/:userId/location').post(auth.authenticateUser, (req, res) => {
//   if (req.user.id !== req.params.userId) {
//     res.sendStatus(401);
//   } else {
//     const location = new Location();
//     location.user = req.params.userId;
//     location.name = req.body.name;
//     location.description = req.body.description;
//     location.streetNumber = req.body.streetNumber;
//     location.route = req.body.route;
//     location.address2 = req.body.address2;
//     location.city = req.body.city;
//     location.state = req.body.state;
//     location.country = req.body.country;
//     location.postalCode = req.body.postalCode;
//     location.coordinates = req.body.coordinates;

//     location.save(async (err) => {
//       if (err) {
//         res.status(400).json(err);
//       } else {
//         await User.findOne({ _id: req.user.id })
//           .exec((err, user) => {
//             if (!err && user) {
//               user.primaryLocation = location._id;
//               user.save((err) => {
//                 if (err) {
//                   console.log("Location not set as a primaryLocation")
//                 }
//               })
//             }
//           });
//         res.setHeader('Location', `user/${location.user}/location/${location.id}`);
//         res.status(201).json(location);
//       }
//     });
//   }
// });

// router.route('/:userId/location/:id').get(auth.authenticateUser, (req, res) => {
//   if (req.user.id !== req.params.userId) {
//     res.sendStatus(401);
//   } else {
//     Location.findOne({ _id: req.params.id, user: req.params.userId })
//       .exec((err, location) => {
//         if (location && !err) {
//           res.status(200).json(location);
//         } else {
//           logger.error(err);
//           res.sendStatus(404);
//         }
//       });
//   }
// });

// router.route('/:userId/location/:id').put(auth.authenticateUser, (req, res) => {
//   if (req.user.id !== req.params.userId) {
//     res.sendStatus(401);
//   } else {
//     Location.findOne({ _id: req.params.id, provider: req.params.userId })
//       .exec((err, location) => {
//         if (err || !location) {
//           res.sendStatus(404);
//         } else if (location.user != req.user.id) {
//           res.sendStatus(401);
//         } else {
//           location.name = req.body.name || location.name;
//           location.description = req.body.description || location.description;
//           location.streetNumber = req.body.streetNumber || location.streetNumber;
//           location.route = req.body.route || location.route;
//           location.address2 = req.body.address2 || location.address2;
//           location.city = req.body.city || location.city;
//           location.state = req.body.state || location.state;
//           location.country = req.body.country || location.country;
//           location.postalCode = req.body.postalCode || location.postalCode;
//           location.coordinates = req.body.coordinates || location.coordinates;

//           location.save((err) => {
//             if (err) {
//               logger.error(err);
//               res.status(400).json(err);
//             } else {
//               res.status(200).json(location);
//             }
//           });
//         }
//       });
//   }
// });

// router.route('/:userId/location/:id/primary').put(auth.authenticateUser, (req, res) => {
//   if (req.user.id !== req.params.userId) {
//     res.sendStatus(401);
//   } else {
//     Location.findOne({ _id: req.params.id, user: req.params.userId })
//       .exec((err, location) => {
//         if (err || !location) {
//           res.sendStatus(404);
//         } else {
//           User.findById(req.params.userId)
//             .exec((err, user) => {
//               if (err || !user) {
//                 res.sendStatus(404);
//               } else {
//                 user.primaryLocation = location._id;
//                 user.save((err) => {
//                   if (err) {
//                     res.status(400).json(err);
//                   } else {
//                     res.status(200).json(location);
//                   }
//                 });
//               }
//             });
//         }
//       });
//   }
// });

module.exports = router;
