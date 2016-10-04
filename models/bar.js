const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const barSchema = new Schema({
  id: { type: String, unique: true },
  categories: { type: Array },
  display_phone: String,
  image_url: String,
  is_claimed: Boolean,
  is_closed: Boolean,
  location: Object,
  mobile_url: String,
  name: String,
  phone: String,
  rating: String,
  rating_img_url: String,
  rating_img_url_large: String,
  rating_img_url_small: String,
  review_count: Number,
  snippet_image_url: String,
  snippet_text: String,
  url: String
});

// Create the model class
const ModelClass = mongoose.model('bar', barSchema);

// Export the model
module.exports = ModelClass;
