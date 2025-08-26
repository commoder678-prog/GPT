const express = require("express");
const { authMiddleWare } = require("../middlewares/auth.middleware");
const { createChat } = require("../controllers/chat.controller");

const router = express.Router();

router.post("/", authMiddleWare, createChat);

module.exports = router;
