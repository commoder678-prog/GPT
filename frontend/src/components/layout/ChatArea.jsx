import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
  MoreHorizontal,
  Paperclip,
  Menu,
  User,
  Bot,
} from "lucide-react";
import AiInput from "../ui/ai-input";

const ChatArea = ({
  messages = [],
  onSendMessage = () => {},
  isTyping = false,
  onToggleSidebar = () => {},
  className = "",
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

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const displayMessages = messages.length ? messages : [];

  return (
    <div
      className={`flex-1 flex flex-col bg-white dark:bg-[#202124] text-gray-200 ${className}`}
    >
      <div className="lg:hidden dark:bg-[#202124] border-b border-gray-700 p-4 flex items-center gap-3">
        <button
          className="p-2 hover:bg-gray-700 rounded-md transition-colors"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-200">Gemini</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {displayMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 items-start ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 flex-shrink-0 mt-1">
                    <Bot />
                  </div>
                )}

                <div
                  className={`flex-1 max-w-3xl ${
                    message.isUser ? "flex justify-end" : ""
                  }`}
                >
                  {message.isUser ? (
                    <div className="bg-gray-700 p-4 rounded-xl">
                      <p className="leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div className="prose prose-invert max-w-none">
                        <p className="leading-relaxed whitespace-pre-line text-gray-200 text-base mb-0">
                          {message.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 mt-3">
                        <button className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-200 transition-colors">
                          <ThumbsUp size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-200 transition-colors">
                          <ThumbsDown size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-200 transition-colors">
                          <RotateCcw size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-200 transition-colors">
                          <Copy size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-200 transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {message.isUser && (
                  <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center shadow-sm">
                    <User size={16} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 flex-shrink-0 mt-1">
                  <Bot />
                </div>
                <div className="flex gap-1.5 items-center mt-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <AiInput
        value={inputMessage}
        setValue={setInputMessage}
        handleKeyPress={handleKeyPress}
      />
      {/* Input Area */}
      {/* <div className="p-4 sm:p-6 bg-[#202124]">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-4 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
              <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-full transition-colors">
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Gemini..."
                className="flex-1 mx-2 bg-transparent border-none outline-none text-gray-200 placeholder-gray-500 text-base"
                style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-9 w-9 flex items-center justify-center transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ChatArea;
