const Authentication = require('./controllers/authentication');
const Bars = require('./controllers/bar');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', function(req, res){
    return res.render('index');
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/api/bars', Bars.search);
  app.get('/api/bar/get', requireAuth, Authentication.getSelectedBar);
  app.post('/api/bar/add', requireAuth, Authentication.setSelectedBar);
  app.post('/api/user/update', requireAuth, Authentication.updateProfile);
}
