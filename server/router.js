const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const yelp = require('./api-yelp');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/api/bars', function(req, res) {

    // request YELP API.
    yelp({ location: req.query.city })
      .then( (body) => {
        res.send(body.data);
      })
      .catch(function (err) {
        res.status(400).send(err.data)
      });

  });
}
