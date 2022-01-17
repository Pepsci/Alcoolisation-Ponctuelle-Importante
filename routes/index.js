const express = require("express");
const router = express.Router();
const drinkModel = require("../model/Drink");
//require models when done

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", {
    css: ["index"],
  });
});

router.get("/dashboard", (res, req, next) => {
  res.render("");
});

router.get("/add", (res, req, next) => {
  res.render("../views/dashboard/drink-add.hbs");
});

router.post("/add", async (res, req, next) => {
  try {
    const newDrink = { ...req.body };
    if (!req.file) newSneaker.image = undefined;
    else newSneaker.image = req.file.path;
    await drinkModel.create(newDrink);
    res.redirect("drink-manage");
  } catch (e) {
    next(e);
  }
});

router.get("/manage", (res, req, next) => {
  res.render("../views/dashboard/drink-manage.hbs");
});

module.exports = router;
