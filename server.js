const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const url = require('url');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({silent: true});
}
console.log(process.env.NODE_ENV);

// DB Setup
mongoose.Promise = global.Promise;
const mongo_url = process.env.MONGOLAB_URI;

mongoose.connect(mongo_url, function(err, db){
  if (err) {
    console.log('Error connecting to');
  } else {
    console.log('Connected to ', mongo_url);
  }
});

const app = express();
app.set("view engine", 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(bodyParser.json());
//app.use(express.static(__dirname + 'public'));
router(app);

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
    message: err.message,
    error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .render('error', {
    message: err.message,
    error: {}
  });
});

const server = app.listen(process.env.PORT, function () {
  console.log('App listening at http://%s:%s',
    server.address().address, server.address().port);
});
