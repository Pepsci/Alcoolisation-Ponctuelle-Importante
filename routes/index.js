const express = require("express");
const router = express.Router();

const uploader = require('../config/cloudinary')
const drinkModel = require("../model/Drink")

router.get("/", (req, res, next) => {
  res.render("index", {
    css: ["index"],
  });
});

router.get('/dashboard', (req, res, next) => {
  res.render('../views/dashboard/drink-manage.hbs')
});

router.get('/drink-add', (req, res, next) => {
  res.render('../views/dashboard/drink-add.hbs')
});

router.post('/drink-add', uploader.single("image"), async (req, res, next) => {
  try {
  const newDrink = {...req.body}
  if (!req.file) drinkModel.image = undefined;
  else drinkModel.image = req.file.path;
  await drinkModel.create(newDrink)
  res.redirect("../views/dashboard/drink-manage.hbs")
  }
  catch(e){
    next(e)
  }
});

router.get('drink-update', async (req, res, next) => {
  try {
  const drink = await drinkModel.findById(req.params.id)
  res.render("../views/dashboard/drink-update.hbs", {drinks})
  }
  catch(e){
    next(e)
  }
});

router.post('drink-update', uploader.single("image"), async (req,res, next) => {
  try {
    const updatedDrink = {...req.body}
    if (req.file) updatedDrink.image = req.file.path
await drinkModel.findByIdAndUpdate(req.params.id, updatedDrink)
res.redirect("../views/dashboard/drink-manage.hbs")
  }
  catch(e){
    next(e)
  }
});

router.get('/drink-manage', (req, res, next) => {
  res.render("../views/dashboard/drink-manage.hbs")
})

module.exports = router;