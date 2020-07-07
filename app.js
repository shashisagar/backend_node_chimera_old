const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const path = require('path');
const config = require('./app/config/config.js').get(process.env.NODE_ENV);

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

// app.set('views', path.join('./app/views'));
// app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, {useNewUrlParser: true, useFindAndModify: false });

app.use('/auth', require('./app/routes/auth'));
app.use('/product', require('./app/routes/product'));
app.use('/user', require('./app/routes/user'));
app.use('/user', require('./app/routes/user-location'));
const server = app.listen(config.port, () => {
  console.log(`Listening on ${config.port}`);
});

module.exports = server;
