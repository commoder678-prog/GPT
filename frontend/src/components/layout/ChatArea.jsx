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
} from "lucide-react";
import AiInput from "../ui/ai-input";

// New Gemini-style Icon Component
const GeminiIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4.5C12 4.08579 12.3358 3.75 12.75 3.75C13.1642 3.75 13.5 4.08579 13.5 4.5V6.3125C13.5 6.44823 13.5518 6.57868 13.6455 6.67241L15.4697 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H15.6875C15.5518 10 15.4213 10.0518 15.3276 10.1455L13.5 11.9697V13.75C13.5 14.1642 13.1642 14.5 12.75 14.5C12.3358 14.5 12 14.1642 12 13.75V12.3125C12 12.1768 11.9482 12.0463 11.8545 11.9526L10.0303 10.1284L10.0303 10.1284L8.20531 8.30346L8.20531 8.30346C8.11158 8.20973 8.05979 8.07928 8.05979 7.94355V6.375C8.05979 5.96079 8.39558 5.625 8.8125 5.625C9.22942 5.625 9.56521 5.96079 9.56521 6.375V7.6875C9.56521 7.82323 9.61701 7.95368 9.71074 8.04741L10.9348 9.27145L12 8.20624V4.5Z"
      fill="url(#gemini-gradient)"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.75 20.25C13.1642 20.25 13.5 19.9142 13.5 19.5V17.6875C13.5 17.5518 13.4482 17.4213 13.3545 17.3276L11.5303 15.5H9.75C9.33579 15.5 9 15.1642 9 14.75C9 14.3358 9.33579 14 9.75 14H11.3125C11.4482 14 11.5787 13.9482 11.6724 13.8545L13.5 12.0303V10.25C13.5 9.83579 13.8358 9.5 14.25 9.5C14.6642 9.5 15 9.83579 15 10.25V11.6875C15 11.8232 15.0518 11.9537 15.1455 12.0474L16.9697 13.8716V13.8716L18.7947 15.6965V15.6965C18.8884 15.7903 18.9402 15.9207 18.9402 16.0564V17.625C18.9402 18.0392 18.6044 18.375 18.1875 18.375C17.7706 18.375 17.4348 18.0392 17.4348 17.625V16.3125C17.4348 16.1768 17.383 16.0463 17.2893 15.9526L16.0652 14.7285L15 15.7938V19.5C15 19.9142 14.6642 20.25 14.25 20.25H12.75Z"
      fill="url(#gemini-gradient)"
    ></path>
    <defs>
      <linearGradient
        id="gemini-gradient"
        x1="8.05979"
        y1="3.75"
        x2="18.9402"
        y2="20.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#89B5F8"></stop>
        <stop offset="1" stopColor="#B490F5"></stop>
      </linearGradient>
    </defs>
  </svg>
);

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

  // Using the screenshot's response as the demo message
  const demoMessages = [
    // {
    //   id: 1,
    //   content:
    //     "Hello! I am Gemini, a large language model trained by Google. I can help you with a wide variety of tasks, like answering your questions, generating text, translating languages, and much more.\n\nHow can I help you today?",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
  ];

  const displayMessages = messages.length ? messages : demoMessages;

  return (
    <div
      className={`flex-1 flex flex-col bg-[#202124] text-gray-200 ${className}`}
    >
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#202124] border-b border-gray-700 p-4 flex items-center gap-3">
        <button
          className="p-2 hover:bg-gray-700 rounded-md transition-colors"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-200">Gemini</h1>
      </div>
      {/* Chat Messages */}
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
                    <GeminiIcon />
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
                    // MODIFIED: AI Message Bubble
                    <div className="flex flex-col">
                      <div className="prose prose-invert max-w-none">
                        <p className="leading-relaxed whitespace-pre-line text-gray-200 text-base mb-0">
                          {message.content}
                        </p>
                      </div>
                      {/* MODIFIED: Action Icons */}
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
                  <GeminiIcon />
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
