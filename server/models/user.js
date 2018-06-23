const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{value} is not a valid email`
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access ='auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({email}).then(user => {
    if (!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        // if (err) return reject();
        // resolve(user);
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      })
    });

    }, err => res.status(400).send(err)
  );

};

UserSchema.methods.removeToken = function(token) {
  // $pull
  const user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  })

};

UserSchema.pre('save', function(next) {
  var User = this;

  if (User.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(User.password, salt, (err, hash) => {
        User.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var user = mongoose.model('user', UserSchema);

module.exports = {user};
