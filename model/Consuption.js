const mongoose = require("mongoose");
const Shema = mongoose.Shema;

const consuptionShema = new Shema({
  date: Date,
  drink: String,
  quantity: Number,
  user: { type: Shema.Types.objectId, ref: "user" },
  drink: { type: Shema.Types.objectId, ref: "drink" },
});

const consuptionModel = mongoose.model("consuption", consuptionShema);

module.exports = consuptionModel;
