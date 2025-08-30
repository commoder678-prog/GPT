const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No Token - Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({ _id: decoded.id });
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token - Unauthorized",
      error
    });
  }
};

module.exports = { authMiddleWare };
