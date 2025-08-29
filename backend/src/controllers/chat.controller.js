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

const getChats = async (req, res) => {
  const user = req.user;

  try {
    const chats = await chatModel.find({ userID: user._id });

    if (!chats)
      return res.status(404).json({
        message: "No Chats Found",
      });

    return res.status(200).json({
      message: "Chats Fetched Successfully",
      chats,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An Error Has Occured",
      error,
    });
  }
};

module.exports = { createChat, getChats };
