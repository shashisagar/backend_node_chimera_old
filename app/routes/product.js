const express = require('express');

const Product = require('../models/product');

const auth = require('../controllers/auth');

const router = express.Router();

router.route('/').get(auth.authenticate, (req, res) => {
  console.log("===== ", req.user)
  const query = Product.find();
  query.where('is_deleted').equals(false);

  // if (req.query.active) {
  //   query.where('active').equals(req.query.active);
  // }
  
  query.exec((err, products) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.json(products);
    }
  });
});

router.route('/:id').get((req, res) => {
  const query = Product.findById(req.params.id);
 
  query.exec((err, product) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  });
});

router.route('/').post((req, res) => {
    const product = new Product();
    product.name = req.body.name;
    product.description = req.body.description;
    product.type = req.body.type;
    product.price = req.body.price;
    product.is_deleted = false;
    product.active = true;

    product.save((err) => {
      if (err)
        res.status(400).json(err);
      else
        res.status(201).json(product);
    });
});

router.route('/:id').put((req, res) => {
    Product.findOneAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) res.status(400).json(err);
        res.status(201).json(product);
    });
});

router.route('/:id').delete((req, res) => {
    Product.remove({ _id: req.params.id }, (err, product) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).json(product);
      }
    });
});

module.exports = router;
