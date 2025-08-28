import React, { useState, useEffect } from "react";

import Sidebar from "../components/layout/Sidebar";
import ChatArea from "../components/layout/ChatArea";

const dummyAIResponses = [
  "Hello! How can I assist you today?",
  "I'm here to help! What do you need?",
  "Could you please provide more details?",
  "Thank you for reaching out!",
  "Let me look into that for you.",
  "That's an interesting question.",
  "I'm not sure about that, but I'll find out.",
  "Can you clarify your last message?",
  "Here's what I found on that topic.",
  "Is there anything else you'd like to know?"
];

const Home = () => {
  const [conversations, setConversations] = useState([]);

  const [activeConversationId, setActiveConversationId] = useState("1");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const handleNewChat = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      lastMessage: undefined,
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  useEffect(() => {
    if (conversations.length === 0) {
      handleNewChat();
    }
  }, []);

  const handleSendMessage = async (content) => {
    if (!activeConversationId) {
      handleNewChat();
    }

    // Use the latest activeConversationId after potential new chat creation
    const currentConversation = conversations.find(
      (c) => c.id === activeConversationId
    );

    if (!currentConversation) {
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: content,
            }
          : conv
      )
    );

    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content:
          dummyAIResponses[Math.floor(Math.random() * dummyAIResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, aiResponse],
                lastMessage:
                  aiResponse.content.length > 50
                    ? aiResponse.content.substring(0, 50) + "..."
                    : aiResponse.content,
              }
            : conv
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const handleConversationSelect = (id) => {
    setActiveConversationId(id);
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onConversationSelect={handleConversationSelect}
        onNewChat={handleNewChat}
      />

      <ChatArea
        messages={activeConversation?.messages || []}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
        onToggleSidebar={toggleSidebar}
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:ml-0" : "lg:ml-0"
        }`}
        activeConversationId={activeConversationId}
        conversations={conversations}
        handleNewChat={handleNewChat}
        setConversations={setConversations}
      />
    </div>
  );
};

export default Home;
