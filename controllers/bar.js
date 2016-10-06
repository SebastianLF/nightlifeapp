const yelp = require('../services/api-yelp');

exports.search = function(req, res, next) {
  const offset = req.query.offset || 0;

  // request YELP API.
  yelp({ location: req.query.city, offset: offset })
    .then( function(body) { res.send(body.data) })
    .catch( function(err) { res.status(400).send(err.data) });
}
