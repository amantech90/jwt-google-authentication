const express = require("express");
const router = express.Router();
const UserController = require("../controller/auth");
const passport = require("passport");

router.post("/signup", (req, res) => {
  UserController.signUp(req.body, (response) => {
    res.json(response);
  });
});

router.post("/login", (req, res) => {
  UserController.login(req.body, (response) => {
    res.json(response);
  });
});

router.post(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserController.home(req.user, (response) => {
      res.json(response);
    });
  }
);

module.exports = router;
