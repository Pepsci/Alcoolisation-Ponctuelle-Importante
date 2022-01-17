const { model, Schema, mongo } = require("mongoose");

const drinkSchema = new Schema({
  name: {
    type: String,
    enum: [
      "largeBeer",
      "smallBeer",
      "smallShooter",
      "largeShooter",
      "bottleBeer",
      "shortDrink",
      "longDrink",
      "wine",
      "champagne",
      "strongAlcohol",
    ],
  },
  image: String,
  size: {
    type: Number,
    enum: [50, 33, 25, 17, 14, 12, 7, 4, 2],
  },
});

const drinkModel = mongoose.model("drink", drinkSchema);

module.exports = drinkModel;
