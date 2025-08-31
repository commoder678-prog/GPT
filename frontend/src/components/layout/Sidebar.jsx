import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquareText,
  Settings,
  X,
  User,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn components are here
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Assuming a utility for class names
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/actions/chatActions";
import { Skeleton } from "@/components/ui/skeleton"; // Added import

// Framer Motion Variants for animations
const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "beforeChildren",
    },
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
  const isLoading = useSelector((state) => state.chat.loading);
  const isCreating = useSelector((state) => state.chat.creating);

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
          "fixed lg:relative top-0 left-0 h-full w-full max-w-[280px] bg-slate-900/98 backdrop-blur-xl border-r border-slate-700/30 flex flex-col z-50 text-slate-100 shadow-2xl",
          className
        )}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-slate-700/30">
          <div className="flex items-center justify-between mb-6">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                NEBULA AI
              </span>
            </motion.h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden text-slate-400 hover:bg-slate-800/70 hover:text-white rounded-lg transition-all duration-200"
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
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25 rounded-xl h-12"
            >
              <Plus size={18} className="mr-2" />
              New Chat
            </Button>
          </motion.div>
        </div>

        {/* Chat History */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 pb-4 flex-shrink-0">
            <h3 className="text-sm text-slate-400 font-semibold uppercase tracking-wider">Recent Conversations</h3>
          </div>
          <ScrollArea className="flex-1 px-6">
            <motion.ul variants={listVariants} className="space-y-3 pb-4">
              <AnimatePresence>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500/30 border-t-indigo-500"></div>
                  </div>
                ) : (
                  <>
                    {chats?.map((chat) => (
                      <motion.li
                        key={chat._id}
                        variants={itemVariants}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="ghost"
                          onClick={() => handleChatSelect(chat._id)}
                          className={cn(
                            "w-full justify-start p-4 h-auto text-left rounded-xl transition-all duration-200 group",
                            chat._id === chatID
                              ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30 shadow-lg"
                              : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent hover:border-slate-600/30"
                          )}
                        >
                          <MessageSquareText
                            size={18}
                            className={cn(
                              "flex-shrink-0 mr-3 transition-colors duration-200",
                              chat._id === chatID ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                            )}
                          />
                          <span className="truncate flex-1 text-sm font-medium leading-relaxed">
                            {chat.title || "New Conversation"}
                          </span>
                        </Button>
                      </motion.li>
                    ))}
                    {isCreating && (
                      <motion.li layout>
                        <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                          <Skeleton className="h-6 w-6 rounded-full bg-slate-700" />
                          <div className="flex flex-col space-y-1">
                            <Skeleton className="h-4 w-28 rounded bg-slate-700" />
                            <Skeleton className="h-3 w-20 rounded bg-slate-700" />
                          </div>
                        </div>
                      </motion.li>
                    )}
                  </>
                )}
              </AnimatePresence>
            </motion.ul>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 border-t border-slate-700/30 space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 rounded-xl h-11 transition-all duration-200"
          >
            <Trash2 size={16} className="mr-3 text-slate-500" /> Clear conversations
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 rounded-xl h-11 transition-all duration-200"
          >
            <Settings size={16} className="mr-3 text-slate-500" /> Settings
          </Button>
          <div className="p-3 rounded-xl hover:bg-slate-800/50 transition-all duration-200 cursor-pointer flex items-center gap-3 border border-transparent hover:border-slate-600/30">
            <Avatar className="w-9 h-9 ring-2 ring-slate-600/50">
              <AvatarImage
                src={user?.avatarUrl || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
                <User size={16} />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-slate-200 truncate">
              {user?.fullName
                ? `${user.fullName.firstName} ${user.fullName.lastName}`
                : "Guest User"}
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
