const mongoose = require('mongoose');

const json = require('../controllers/json');
// const Availability = require('../constants/availability');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  active: { type: Boolean, required: true },
  type: { type: String, required: false },
  is_deleted: { type: Boolean, default: false },
  // items: [{ type: Schema.Types.ObjectId, ref: 'Item', required: true }],
  // status: {
  //     type: String,
  //     enum: ['Received', 'Confirmed', 'Declined', 'Canceled', 'Ingredient Pick Up', 'En Route', 'Arrived', 'In Progress', 'Completed'],
  //     required: true
  //   }
}, { timestamps: true });

ProductSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  return json.formatModel(this.toObject());
};

// ProductSchema.path('items').validate((items) => {
//   if (Array.isArray(items) && items.length > 0) {
//     return true;
//   }
//   return false;
// }, 'items is required.');

module.exports = mongoose.model('Product', ProductSchema);
