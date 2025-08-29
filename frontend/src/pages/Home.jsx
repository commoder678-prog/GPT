import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Sidebar from "../components/layout/Sidebar";
import ChatArea from "../components/layout/ChatArea";
import { getUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { createChat, getChats } from "../store/actions/chatActions";

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
  "Is there anything else you'd like to know?",
];

const Home = () => {
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  const [chatID, setChatID] = useState("1");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeConversation = chats.find((c) => c.id === chatID);

  const handleNewChat = async () => {
    const title = prompt("Enter the title of your chat");

    const response = await dispatch(createChat({ title }));

    setChats((prev) => [response, ...prev]);
    setChatID(response.chatID);
  };

  async function getUserDetails() {
    await dispatch(getUser());
    await dispatch(getChats());

  }

  useEffect(() => {
    // const tempSocket = io("http://localhost:3000", {
    //   withCredentials: true,
    // });

    // tempSocket.on("ai-response", (message) => {
    //   console.log(message);
    // });

    // setSocket(tempSocket);

    getUserDetails();
  }, []);

  const handleSendMessage = async (content) => {
    // Use the latest chatID after potential new chat creation
    const currentConversation = chats.find((c) => c.id === chatID);

    if (!currentConversation) {
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((conv) =>
        conv.id === chatID
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

      setChats((prev) =>
        prev.map((conv) =>
          conv.id === chatID
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

  const handlechatselect = (id) => {
    setChatID(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        chats={chats}
        chatID={chatID}
        onchatselect={handlechatselect}
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
        chatID={chatID}
        chats={chats}
        handleNewChat={handleNewChat}
        setChats={setChats}
      />
    </div>
  );
};

export default Home;
