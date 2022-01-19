const express = require("express");
const router = express.Router();
const uploader = require("../config/cloudinary");
const drinkModel = require("../model/Drink");

router.get("/", (req, res, next) => {
  res.render("index", {
    css: ["index"],
  });
});

router.get("/menu", (req, res, next) => {
  res.render("dashboard/dashboard");
});

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard/drink-manage.hbs");
});

router.get("/drink-add", (req, res, next) => {
  res.render("dashboard/drink-add");
});

router.post("/drink-add", uploader.single("image"), async (req, res, next) => {
  const newDrink = { ...req.body };
  console.log(uploader);
  console.log(newDrink);
  if (!req.file) newDrink.image = undefined;
  else newDrink.image = req.file.path;

  try {
    await drinkModel.create(newDrink);
    res.redirect("/drink-manage");
  } catch (err) {
    next(err);
  }
});

router.get("/drink-manage", async (req, res, next) => {
  try {
    res.render("dashboard/drink-manage", {
      drinkManage: await drinkModel.find(),
      css: ["table"],
    });
  } catch (next) {}
});

router.get("/drink-update/:id", async (req, res, next) => {
  try {
    const drinkSize = await drinkModel.find();
    const drink = await drinkModel.findById(req.params.id);
    res.render("dashboard/drink-update", { drink, drinkSize });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/drink-update/:id",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const updatedDrink = { ...req.body };
      if (req.file) updatedDrink.image = req.file.path;
      await drinkModel.findByIdAndUpdate(req.params.id, updatedDrink, {
        new: true,
      });
      res.redirect("/drink-manage");
    } catch (e) {
      next(e);
    }
  }
);

router.get("/drink-delete/:id", (req, res, next) => {
  drinkModel
    .findByIdAndDelete(req.params.id)
    .then((deletedDrink) => {
      res.redirect("/drink-manage");
    })
    .catch(next);
});

module.exports = router;
