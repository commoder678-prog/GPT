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
  <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-indigo-500/20">
    <Bot size={20} className="text-white" />
  </div>
);

// A simple and clean component for the user's avatar
const UserAvatar = ({ user }) => (
  <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg ring-2 ring-slate-500/20">
    <User size={18} className="text-slate-200" />
  </div>
);

// The welcoming UI when there are no messages
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-8 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full mb-8 backdrop-blur-sm border border-indigo-500/20 shadow-2xl"
    >
      <Bot size={56} className="text-indigo-400" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="text-3xl font-bold text-slate-100 mb-4 tracking-tight"
    >
      How can I help you today?
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="text-slate-400 max-w-md leading-relaxed text-lg"
    >
      Feel free to ask me anything, from general knowledge questions to
      summarizing articles or even helping you write code.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="mt-8 flex flex-wrap gap-3 justify-center max-w-lg"
    >
      {["Ask a question", "Write code", "Explain concepts", "Creative writing"].map((suggestion, index) => (
        <div
          key={index}
          className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600/30 hover:border-indigo-500/30 transition-all duration-200 cursor-pointer"
        >
          {suggestion}
        </div>
      ))}
    </motion.div>
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
        "flex-1 flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 overflow-hidden",
      )}
    >
      {/* Header for mobile */}
      <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/30 p-4 flex items-center gap-3 sticky top-0 z-10 shadow-lg">
        <button
          className="p-2 hover:bg-slate-800/70 rounded-lg transition-all duration-200"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-slate-100 truncate flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">N</span>
          </div>
          <span>Nebula AI</span>
        </h1>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 sm:p-8">
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
                      "flex gap-5 items-start",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {/* Bot Avatar */}
                    {message.role === "model" && <BotAvatar />}

                    {/* Message Content */}
                    <div
                      className={cn(
                        "max-w-[80%] px-5 py-4 text-sm",
                        message.role === "user" ? "self-end" : "self-start",
                        message.role === "user"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-br-md shadow-xl border border-indigo-500/20"
                          : "bg-slate-800/50 backdrop-blur-sm text-slate-100 leading-relaxed whitespace-pre-wrap rounded-2xl border border-slate-700/30 shadow-lg"
                      )}
                    >
                      <div className="prose prose-invert max-w-none prose-p:my-1 prose-pre:my-3 prose-code:text-indigo-300 prose-strong:text-slate-100">
                        {message.content}
                      </div>
                      {message.role === "model" && (
                        <div className="flex items-center gap-2 mt-4 -mb-1 opacity-60 hover:opacity-100 transition-all duration-200">
                          <button className="p-2 hover:bg-slate-700/70 rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-200 hover:scale-110">
                            <ThumbsUp size={14} />
                          </button>
                          <button className="p-2 hover:bg-slate-700/70 rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-200 hover:scale-110">
                            <ThumbsDown size={14} />
                          </button>
                          <button className="p-2 hover:bg-slate-700/70 rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-200 hover:scale-110">
                            <RotateCcw size={14} />
                          </button>
                          <button className="p-2 hover:bg-slate-700/70 rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-200 hover:scale-110">
                            <Copy size={14} />
                          </button>
                          <button className="p-2 hover:bg-slate-700/70 rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-200 hover:scale-110">
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
                className="flex items-start gap-5 self-start"
              >
                <BotAvatar />
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl px-5 py-4 border border-slate-700/30 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-slate-400 text-sm font-medium">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {chatID ? (
        <>
          <div className="w-full bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/30 pt-6 pb-4 max-w-4xl mx-auto">
            <AiInput
              value={inputMessage}
              setValue={setInputMessage}
              handleKeyPress={handleKeyPress}
            />
            <p className="text-xs text-center text-slate-500 pt-3 px-4 font-medium">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatArea;
