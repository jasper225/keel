const passport = require("passport");

const protect = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ message: "Unauthorized" });
    req.userId = user;
    next();
  })(req, res, next);
};
module.exports = { protect };
