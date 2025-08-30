import React, { useState, useEffect, useRef } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
  MoreHorizontal,
  Menu,
  User,
  Bot,
} from "lucide-react";
import AiInput from "../ui/ai-input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have this utility

// A simple and clean component for the bot's avatar
const BotAvatar = () => (
  <div className="w-9 h-9 flex-shrink-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-md">
    <Bot size={20} className="text-indigo-300" />
  </div>
);

// A simple and clean component for the user's avatar
const UserAvatar = ({ user }) => (
  <div className="w-9 h-9 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
    <User size={18} className="text-gray-300" />
  </div>
);

// The welcoming UI when there are no messages
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-8 bg-slate-800/50 rounded-full mb-6"
    >
      <Bot size={48} className="text-indigo-300" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="text-2xl font-bold text-slate-200"
    >
      How can I help you today?
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="text-slate-400 mt-2 max-w-sm"
    >
      Feel free to ask me anything, from general knowledge questions to
      summarizing articles or even helping you write code.
    </motion.p>
  </div>
);

const ChatArea = ({
  messages,
  onSendMessage = () => {},
  isTyping = false,
  onToggleSidebar = () => {},
  className = "",
  chatID,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    await onSendMessage(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const displayMessages = messages?.length ? messages : [];

  return (
    <div
      className={cn(
        "flex-1 flex flex-col bg-slate-900 text-gray-200 overflow-hidden",
        className
      )}
    >
      {/* Header for mobile */}
      <div className="lg:hidden bg-slate-900/70 backdrop-blur-md border-b border-slate-700/50 p-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          className="p-2 hover:bg-slate-800 rounded-md transition-colors"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-slate-200 truncate">
          AI Assistant
        </h1>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {displayMessages.length === 0 && !isTyping ? (
              <EmptyState />
            ) : (
              <AnimatePresence>
                {displayMessages.map((message) => (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    layout
                    className={cn(
                      "flex gap-4 items-start",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {/* Bot Avatar */}
                    {message.role === "model" && <BotAvatar />}

                    {/* Message Content */}
                    <div
                      className={cn(
                        "flex-1 max-w-2xl rounded-2xl p-4 shadow-md",
                        message.role === "user"
                          ? "bg-gradient-to-br from-[#0c3483] to-[#6b8cce] text-white rounded-br-none"
                          : "bg-slate-800 text-slate-300 rounded-bl-none"
                      )}
                    >
                      <div className="prose prose-invert max-w-none prose-p:my-0 prose-pre:my-2">
                        {message.content}
                      </div>
                      {message.role === "model" && (
                        <div className="flex items-center gap-1 mt-3 -mb-1 opacity-70 hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200 transition-colors">
                            <ThumbsUp size={14} />
                          </button>
                          <button className="p-1.5 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200 transition-colors">
                            <ThumbsDown size={14} />
                          </button>
                          <button className="p-1.5 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200 transition-colors">
                            <RotateCcw size={14} />
                          </button>
                          <button className="p-1.5 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200 transition-colors">
                            <Copy size={14} />
                          </button>
                          <button className="p-1.5 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200 transition-colors">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                    {/* User Avatar */}
                    {message.role === "user" && <UserAvatar />}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 items-start"
              >
                <BotAvatar />
                <div className="flex gap-1.5 items-center mt-3 bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area - using the existing AiInput component */}
      <div className="w-full bg-slate-900 border-t border-slate-700/50 pt-2">
        <AiInput
          value={inputMessage}
          setValue={setInputMessage}
          handleKeyPress={handleKeyPress}
        />
        <p className="text-xs text-center text-slate-500 pb-2 px-4">
          AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default ChatArea;
