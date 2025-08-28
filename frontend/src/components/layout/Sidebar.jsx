import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, Settings, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const Sidebar = ({
  isOpen,
  onToggle,
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewChat,
  className,
}) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
          transition: { type: "spring", damping: 30, stiffness: 300 },
        }}
        className={cn(
          "relative top-0 left-0 h-full w-80 bg-white border-r border-gray-200 flex flex-col z-50",
          className
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">CHAT A.I+</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onNewChat}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus size={18} className="mr-2" />
              New chat
            </Button>
            <Button variant="outline" size="icon">
              <Menu size={18} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-500 font-medium">
                Your conversations
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Clear All
              </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-1">
                {conversations?.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => onConversationSelect(conversation.id)}
                      className={cn(
                        "w-full justify-start p-3 h-auto text-left",
                        conversation.id === activeConversationId
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <MessageCircle
                        size={16}
                        className="text-gray-400 flex-shrink-0 mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm font-medium">
                          {conversation.title}
                        </div>
                        {conversation.lastMessage && (
                          <div className="truncate text-xs text-gray-400 mt-1">
                            {conversation.lastMessage}
                          </div>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-400 mb-4">Last 7 Days</div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:bg-gray-50"
          >
            <Settings size={16} className="mr-3" />
            Settings
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:bg-gray-50"
          >
            <Avatar className="w-6 h-6 mr-3">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>
                <User size={14} />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Andrew Neilson</span>
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
