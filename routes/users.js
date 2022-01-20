const express = require("express");
const router = express.Router();
const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const consumptionModel = require("../model/Consumption");
const drinkModel = require("../model/Drink");
const uploader = require("./../config/cloudinary");
const session = require("express-session");

router.get("/signup", (req, res, next) => {
  res.render("user/signup.hbs");
});

router.post("/signup", async (req, res, next) => {
  const newUser = { ...req.body };
  try {
    const foundUser = await userModel.findOne({ email: newUser.email });
    if (foundUser) {
      res.redirect("/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await userModel.create(newUser);
      res.redirect("/signin");
    }
  } catch (e) {
    console.error(e);
    res.redirect("/signup");
  }
});

router.get("/signin", (req, res, next) => {
  res.render("user/signin.hbs");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      // This will be handled, by the eraseSessionMessage middelware in app.js
      req.session.msg = { status: 401, text: "Invalid credentials" };
      /**  Same could be done using the flash middleware **/
      // req.flash("error", "Invalid credentials");  // If you wanted to use flash you could aswell, you would have to handle i
      return res.redirect("/user/signin");
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      // req.flash("error", "Invalid credentials");
      req.session.msg = { status: 401, text: "Invalid credentials" };
      return res.render("user/signin");
    }
    req.session.currentUser = {
      _id: foundUser._id,
      role: foundUser.role,
    };

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

router.get("/profil", async (req, res, next) => {
  try {
    res.render("user/profil.hbs", {
      consumption: await consumptionModel
        .find({ user: req.session.currentUser._id })
        .populate("drink"),
      js: ["profil"],
      css: ["profil"],
    });
  } catch (e) {
    console.error(e);
  }
});

router.get("/api", async (req, res, next) => {
  try {
    res.json(await consumptionModel.find().populate("drink"));
  } catch (error) {
    next(error);
  }
});

router.get("/user-update/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.render("user/user-update", { user });
  } catch (error) {
    next(error);
  }
});

router.post("/user-update/:id", async (req, res, nexy) => {
  try {
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    if (req.session.currentUser.role === "admin") {
      res.redirect("/user-manage");
    } else if (req.session.currentUser.role === "user") {
      res.redirect("/profil");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/cons-add", async (req, res, next) => {
  res.render("user/consumption-add.hbs", {
    drink: await drinkModel.find(),
    // consumption: await consumptionModel.find().populate("drinks"),
  });
});

router.post("/cons-add", uploader.single("image"), async (req, res, next) => {
  try {
    const newCons = { ...req.body };
    if (!req.file) newCons.image = undefined;
    else newCons.image = req.file.path;
    newCons.user = req.session.currentUser._id;
    console.log(newCons);
    await consumptionModel.create(newCons);
    res.redirect("/profil");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
