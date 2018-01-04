const mongoose = require("mongoose");
const Admin = mongoose.model("admins");

module.exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    res.send({});
    return;
  }
  Admin.findById(req.user.id).then(user => {
    if (user) {
      next();
    } else {
      res.send({});
      return;
    }
  });
};
