const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/regEx');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (data) => URL_REGEX.test(data),
        // validator: (data) => validator.isURL(data),
        message: 'Некоректный url',
      },
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: ObjectId,
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
