import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Paperclip, Send, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

function useAutoResizeTextarea({
  minHeight,
  maxHeight
}) {
  const textareaRef = useRef(null)

  const adjustHeight = useCallback((reset) => {
    const textarea = textareaRef.current
    if (!textarea) return

    if (reset) {
      textarea.style.height = `${minHeight}px`
      return
    }

    textarea.style.height = `${minHeight}px`
    const newHeight = Math.max(
      minHeight,
      Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
    )

    textarea.style.height = `${newHeight}px`
  }, [minHeight, maxHeight])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = `${minHeight}px`
    }
  }, [minHeight])

  useEffect(() => {
    const handleResize = () => adjustHeight()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight])

  return { textareaRef, adjustHeight }
}

const MIN_HEIGHT = 52
const MAX_HEIGHT = 200

export default function AiInput({ value, setValue, handleKeyPress, onSend }) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && onSend) {
      onSend();
    }
    adjustHeight(true);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="p-4">
      <div className="relative max-w-4xl mx-auto">
        <div className="relative bg-[#2f2f2f] rounded-3xl border border-[#4a4a4a] shadow-lg focus-within:border-[#5a5a5a] transition-all duration-200">
          <div className="relative">
            <Textarea
              value={value}
              placeholder="Message ChatGPT"
              className="w-full bg-transparent border-none text-white placeholder:text-gray-400 resize-none focus-visible:ring-0 px-4 py-4 pr-12 rounded-3xl text-base leading-relaxed min-h-[52px]"
              ref={textareaRef}
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              style={{ height: `${MIN_HEIGHT}px` }}
            />
            
            {/* Attachment button */}
            <div className="absolute left-4 bottom-3">
              <label
                className={cn(
                  "cursor-pointer rounded-lg p-2 transition-all duration-200 hover:bg-[#3a3a3a]",
                  imagePreview ? "text-orange-400" : "text-gray-400 hover:text-white"
                )}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
                <Paperclip className="w-5 h-5" />
                {imagePreview && (
                  <div className="absolute w-32 h-32 bottom-12 left-0 rounded-xl overflow-hidden shadow-xl border-2 border-orange-500/30">
                    <img
                      className="object-cover w-full h-full"
                      src={imagePreview}
                      alt="attachment preview"
                    />
                    <button
                      onClick={handleClose}
                      className="bg-[#1a1a1a] text-white absolute -top-2 -right-2 rounded-full rotate-45 w-6 h-6 flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </label>
            </div>

            {/* Send button */}
            <div className="absolute right-3 bottom-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!value.trim()}
                className={cn(
                  "rounded-lg p-2 transition-all duration-200",
                  value.trim()
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-[#3a3a3a] text-gray-500 cursor-not-allowed"
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}