const express = require('express');
const router = express.Router();
const userModel = // require user model when done

router.get("/signup", (req, res, next) => {
  res.render("../views/user/signup.hbs")
  });

router.get('/signin', (req, res, next) => {
  res.render("../views/user/signin.hbs");
});

router.get("/profil", (req, res, next) => {
  res.render("../views/user/profil.hbs")
});

module.exports = router;
