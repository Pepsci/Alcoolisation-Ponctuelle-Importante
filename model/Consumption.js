const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consumptionSchema = new Schema({
  date: Date,
  quantity: Number,
  user: { type: Schema.Types.ObjectId, ref: "user" },
  drink: { type: Schema.Types.ObjectId, ref: "drinks" },
});

const consumptionModel = mongoose.model("consumption", consumptionSchema);

module.exports = consumptionModel;
