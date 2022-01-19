const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
  drinkName: {
    type: String,
  },
  image: String,
  ABV : {
    type: Number,
    min: 1,
    max: 100,
  },
  size: {
    type: Number,
    enum: [50, 33, 25, 17, 14, 12, 7, 4, 2],
  },
});

const drinkModel = mongoose.model("drinks", drinkSchema);
module.exports = drinkModel;
