const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consumptionSchema = new Schema({
  date: Date,
  title: String,

  user: { type: Schema.Types.ObjectId, ref: "user" },
  drink: [
    {
      drink: { type: Schema.Types.ObjectId, ref: "drinks" },
      quantity: {
        type : Number,
        min : 0,
      }
    },
  ],
});

const consumptionModel = mongoose.model("consumption", consumptionSchema);

module.exports = consumptionModel;
