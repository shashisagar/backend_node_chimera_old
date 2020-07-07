const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const json = require('../controllers/json');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, trim: true, required: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  primaryLocation: { type: Schema.Types.ObjectId, ref: 'UserLocation'}
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'email is already exist' });

UserSchema.pre('save', function save(callback) {
  const user = this;

  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, (err, salt) => {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return callback(err); }
      user.password = hash;
      callback();
    });
  });
});

UserSchema.path('email').validate((email) => {
  const emailRegex = /^([\w-\.\+]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'email is not valid.');

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};


UserSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();

  delete obj.password;

  return json.formatModel(obj);
};

module.exports = mongoose.model('User', UserSchema);
