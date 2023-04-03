function roleCheck(role) {
  return (req, res, next) => {
    console.log(req.session.user);
    if (req.session.role == "admin") {
      next();
    } else {
      if (role != req.session.role) {
        res.status(401);
        return res.send("Not Allowed");
      }
      next();
    }
  };
}

var checkLogin = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    console.log("localhost:3000" + req.url);
    res.redirect("/");
  } else {
    next();
  }
};
module.exports = { roleCheck, checkLogin };
