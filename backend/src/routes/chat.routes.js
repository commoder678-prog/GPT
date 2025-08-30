const express = require("express");
const { authMiddleWare } = require("../middlewares/auth.middleware");
const {
  createChat,
  getChats,
  getMessages,
} = require("../controllers/chat.controller");

const router = express.Router();

router.post("/", authMiddleWare, createChat);
router.get("/get-chats", authMiddleWare, getChats)

router.get("/get-messages/:chatID", authMiddleWare, getMessages)

module.exports = router;
