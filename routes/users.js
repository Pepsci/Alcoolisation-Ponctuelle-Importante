const express = require("express");
const router = express.Router();
const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const flash = require("flash");
const consumptionModel = require("../model/Consumption");
const drinkModel = require("../model/Drink");
const uploader = require("./../config/cloudinary");

router.get("/signup", (req, res, next) => {
  res.render("../views/user/signup.hbs");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
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
    res.redirect("/signup");
  }
});

router.get("/signin", (req, res, next) => {
  res.render("../views/user/signin.hbs");
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await userModel.findOne({ email: email });
    if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
      const isSamePasseword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePasseword) {
        req.flash("error", "Invalid credentials");
        res.redirect("/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password;
        req.session.currentUser = userObject;
        res.redirect("/");
      }
    }
  } catch (e) {
    next(e);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

router.get("/profil", (req, res, next) => {
  res.render("../views/user/profil.hbs");
});

router.get("/cons-add", async (req, res, next) => {
  res.render("../views/user/consumption-add.hbs", {
    consumption: await consumptionModel.find().populate("drinks"),
  });
});

router.post("/cons-add", uploader.single("image"), async (req, res, next) => {
  try {
    const newCons = { ...req.body };
    if (!req.file) newCons.image = undefined;
    else newCons.image = req.file.path;
    await consumptionModel.create(newCons);
    res.redirect("/profil");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
