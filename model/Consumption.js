const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consumptionSchema = new Schema({
  date: Date,
  drink: String,
  quantity: Number,
  user: { type: Schema.Types.objectId, ref: "user" },
  drink: { type: Schema.Types.objectId, ref: "drink" },
});

const consumptionModel = mongoose.model("consumption", consumptionSchema);

module.exports = consumptionModel;
