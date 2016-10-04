const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  timezone: String,
  gender: String,
  favorite_place: String,
  notif_friends: Boolean,
  selected_bar: { type: Schema.Types.ObjectId, ref: 'bar'},
  friends: [{ type: Schema.Types.ObjectId, ref: 'user'}]
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // start encrypting process only when password field is updated.
  // example: user.gender = male; user.save() will not trigger
  // encrypting process.
  if (user.isModified('password')) {
    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { return next(err); }

      // hash (encrypt) our password using the salt
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) { return next(err); }

        // overwrite plain text password with encrypted password
        user.password = hash;
        next();
      });
    });
  }

  next();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
