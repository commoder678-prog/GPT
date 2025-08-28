const express = require("express");
const { authMiddleWare } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleWare, (req, res) => {
  return res.status(200).json({
    message: "User fetched successfully",
    user: {
      email: req.user.email,
      fullName: req.user.fullName,
      id: req.user._id,
    },
  });
});

module.exports = router;
