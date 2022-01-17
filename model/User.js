const mongoose = require("mongoose");
const Shema = mongoose.Shema;

const userShema = new Shema({
  userName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const userModel = mongoose.model("user", userShema);

module.exports = userModel;
