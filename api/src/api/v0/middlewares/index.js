const firebase = require('../../../firebase');

module.exports = {
  isAuthenticated: function (req, res, next) {
    const sessionCookie = req.cookies.session || "";
    firebase.auth
    .verifySessionCookie(sessionCookie, true)
    .then(() => {
      next()
    })
    .catch((error) => {
      res.redirect("login/");
    });
  }
}