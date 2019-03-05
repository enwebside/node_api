const timestamp = require('mongoose-timestamp');
const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true
      },
      balance: {
        type: Number,
        default: 0
      }
});

ItemsSchema.plugin(timestamp);

const Items = mongoose.model('Items', ItemsSchema);
module.exports = Items;