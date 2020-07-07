const mongoose = require('mongoose');

const json = require('../controllers/json');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  description: { type: String, required: true },
  streetNumber: { type: String, required: true },
  route: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true }
}, { timestamps: true });

LocationSchema.methods.toJSON = function toJSON() {
  return json.formatModel(this.toObject());
};

module.exports = mongoose.model('UserLocation', LocationSchema);
