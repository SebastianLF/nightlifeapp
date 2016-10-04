const jwt = require('jwt-simple');
const User = require('../models/user');
const Bar = require('../models/bar');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

const findUser = (req, res, next, email) => {

  return User.findOne({ email: email });
}

exports.signin = function(req, res, next) {

  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = User({
      email: email,
      password: password,
      timezone: 'Europe/Paris',
      gender: '',
      favorite_place: '',
      notif_friends: false,
      selected_bar: null,
      friends: []
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });

  });
}

exports.getSelectedBar = function(req, res, next) {

  if (!req.user.selected_bar) {
    return res.send(undefined);
  }

  Bar.findOne({ _id: req.user.selected_bar }, 'id -_id', function(err, bar) {

    if (err) { return next(err) }
    if (!bar) { return res.status(204).send(undefined); }

    return res.status(200).send(bar.id);
  });

};

exports.setSelectedBar = function(req, res, next){

  const authUser = req.user;
  const barToSet = req.body.bar;

      // bar found, update it.
      if (barToSet) {

        Bar.findOneAndUpdate( {id: barToSet.id}, barToSet, { upsert: true, new: true }, function (err, updatedBar) {
          console.log(updatedBar);

          authUser.selected_bar = updatedBar._id;
          authUser.save(function (err, updatedUser) {
            if (err) { return next(err)}

            // send only id property.
            const id = updatedBar.id
            res.send(id);
          });
        });

      }else {

        authUser.selected_bar = null;
        authUser.save(function (err, updatedUser) {
          if (err) { return next(err)}
          res.send(undefined);
        });
      }
}

exports.updateProfile = function (req, res, next) {

  const data = req.body.userData;
  console.log(data);
  if (!data.timezone || !data.gender) {
    return ;
  }

  User.findOne({ email: req.user.email }, function(err, user) {

    if (err) { return next(err) }
    if (!user) { return res.send('Auth not found in db') }

    user.timezone = data.timezone;
    user.gender = data.gender;
    user.notif_friends = data.notif_friends;

    user.save(function(err) {
      if (err) { next(err) }

      const usersSent = {gender: user.gender, notif_friends: user.notif_friends, timezone: data.timezone};
      res.status(200).send(usersSent);
    });
  });
}

exports.addFriend = function (req, res, next) {
  const friendId = req.body.friendId;

}
