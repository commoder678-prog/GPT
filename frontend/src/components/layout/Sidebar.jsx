import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquareText, Settings, X, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn components are here
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Assuming a utility for class names
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/actions/chatActions";

// Framer Motion Variants for animations
const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, when: "beforeChildren" },
  },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
};


const Sidebar = ({
  isOpen,
  onToggle,
  chatID,
  onchatselect,
  onNewChat,
  className,
}) => {
  // Restored Redux hooks for real data
  const user = useSelector((state) => state.user.user);
  const chats = useSelector((state) => state.chat.chats);
  const dispatch = useDispatch();

  const handleChatSelect = (selectedChatId) => {
    onchatselect(selectedChatId);
    // Restored dispatch call to fetch messages
    dispatch(getMessages(selectedChatId));
    
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar Container */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed top-0 left-0 h-full w-full max-w-[300px] bg-gray-900/95 backdrop-blur-lg border-r border-gray-700/50 flex flex-col z-50 text-gray-200",
          className
        )}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"
            >
              CHAT A.I+
            </motion.h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <X size={20} />
            </Button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={onNewChat}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={18} className="mr-2" />
              New Chat
            </Button>
          </motion.div>
        </div>

        {/* Chat History */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 flex-shrink-0">
             <h3 className="text-sm text-gray-400 font-medium">Your Chats</h3>
          </div>
          <ScrollArea className="flex-1 px-4">
            <motion.ul variants={listVariants} className="space-y-2">
              <AnimatePresence>
                {chats?.map((chat) => (
                  <motion.li
                    key={chat._id}
                    variants={itemVariants}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleChatSelect(chat._id)}
                      className={cn(
                        "w-full justify-start p-3 h-auto text-left rounded-lg transition-colors duration-200",
                        chat._id === chatID
                          ? "bg-indigo-500/20 text-white"
                          : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
                      )}
                    >
                      <MessageSquareText size={16} className="flex-shrink-0 mr-3" />
                      <span className="truncate flex-1 text-sm font-medium">
                        {chat.title || "New Conversation"}
                      </span>
                    </Button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-700/50 space-y-2">
           <Button variant="ghost" className="w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-gray-200">
                <Trash2 size={16} className="mr-3" /> Clear conversations
           </Button>
           <Button variant="ghost" className="w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-gray-200">
                <Settings size={16} className="mr-3" /> Settings
           </Button>
           <div className="p-2 rounded-lg hover:bg-gray-800/60 transition-colors cursor-pointer flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatarUrl || "https://github.com/shadcn.png"} />
                <AvatarFallback className="bg-indigo-600 text-white">
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-200 truncate">
                {user?.fullName ? `${user.fullName.firstName} ${user.fullName.lastName}` : "Guest User"}
              </span>
           </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

