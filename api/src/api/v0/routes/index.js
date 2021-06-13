const router = require('express').Router();

const firebase = require('../../../firebase');

const middlewares = require('../middlewares');

router.get("/login", function (req, res) {
  res.render("login.html");
});

router.get("/signup", function (req, res) {
  res.render("signup.html");
});

router.get("/profile", middlewares.isAuthenticated, function (req, res) {
  res.render("profile.html");
});

router.get("/", function (req, res) {
  res.render("index.html");
});

router.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  firebase.auth
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

router.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

module.exports = router;