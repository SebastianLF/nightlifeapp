const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const url = require('url');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

console.log(process.env.NODE_ENV);
require('dotenv').config();

// DB Setup
mongoose.Promise = global.Promise;
const mongo_url = process.env.MONGOLAB_URI;

mongoose.connect(mongo_url, function(err, db){
  if (err) {
    console.log('Unable to connect to the mongodb server. Error', err);
  } else {
    console.log('Connection established to', mongo_url);
  }
});

const app = express();

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

const server = app.listen(process.env.PORT || 3001, 'localhost', function () {
  console.log('App listening at http://%s:%s',
    server.address().address, server.address().port);
});
