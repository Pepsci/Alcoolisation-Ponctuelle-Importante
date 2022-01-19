const express = require("express");
const router = express.Router();
const uploader = require('../config/cloudinary')
const drinkModel = require("../model/Drink")

router.get("/", (req, res, next) => {
  res.render("index", {
    css: ["index"],
  });
});

<<<<<<< HEAD
router.get('/dashboard', (req, res, next) => {
  res.render('dashboard/drink-manage.hbs')
=======
router.get("/menu", (req, res, next) => {
  res.render("dashboard/dashboard");
});

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard/drink-manage.hbs");
>>>>>>> cd8e07ba5aff25a2541a9816f1e949e709a768a5
});

router.get('/drink-add', (req, res, next) => {
  res.render('dashboard/drink-add.hbs')
});

router.post('/drink-add', uploader.single("image"), async (req, res, next) => {
  console.log('Drink add post');
  const newDrink = {...req.body}
  if (!req.file) newDrink.image = undefined;
  else newDrink.image = req.file.path;
  try {
  await drinkModel.create(newDrink)
  res.redirect("/dashboard/drink-manage")
  }
  catch(e){
    res.redirect("/")
  }
});

router.get('/drink-update/:id', async (req, res, next) => {
  try {
  const drink = await drinkModel.findById(req.params.id)
  res.render("dashboard/drink-update.hbs", {drinks})
  }
  catch(e){
    next(e)
  }
});

<<<<<<< HEAD
router.post('/drink-update/:id', uploader.single("image"), async (req,res, next) => {
  try {
    const updatedDrink = {...req.body}
    if (req.file) updatedDrink.image = req.file.path
await drinkModel.findByIdAndUpdate(req.params.id, updatedDrink)
res.redirect("dashboard/drink-manage.hbs")
  }
  catch(e){
    next(e)
=======
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
>>>>>>> cd8e07ba5aff25a2541a9816f1e949e709a768a5
  }
);

router.get('/drink-manage', (req, res, next) => {
  res.render("dashboard/drink-manage.hbs")
})

module.exports = router;