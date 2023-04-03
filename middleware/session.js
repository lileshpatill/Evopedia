// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (!(req.session.user && req.cookies.user_sid)) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

module.exports = sessionChecker;
