const mongoose = require('mongoose');
const Schema = mongoose;

export const catSchema = mongoose.Schema({
  cat_name: {
    type: String,
  },
  weight: {
    type: Number,
  },
  filename: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  location: {
    type: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;

export default Cat;
