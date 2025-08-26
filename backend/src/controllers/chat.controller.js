const chatModel = require("../models/chat.model");

const createChat = async (req, res) => {
  const { title } = req.body;
  const user = req.user;

  const chat = await chatModel.create({
    userID: user._id,
    title,
  });

  res.status(201).json({
    message: "Chat Created Successfully",
    chat: {
      chatID: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
    },
  });
};

module.exports = { createChat };
