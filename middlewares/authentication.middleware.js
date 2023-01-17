const mustLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {console.log(req.user); return next();}
  res.redirect("/login");
};

const mustLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
};

module.exports = { mustLoggedIn, mustLoggedOut };
