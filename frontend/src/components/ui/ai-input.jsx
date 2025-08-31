import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Globe, Paperclip, Plus, Send } from "lucide-react"

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

const MIN_HEIGHT = 48
const MAX_HEIGHT = 164

const AnimatedPlaceholder = ({
  showSearch
}) => (
  <AnimatePresence mode="wait">
    <motion.p
      key={showSearch ? "search" : "ask"}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.1 }}
      className="pointer-events-none w-[150px] text-sm absolute text-black/70 dark:text-white/70">
      {showSearch ? "Search the web..." : "Ask Skiper Ai..."}
    </motion.p>
  </AnimatePresence>
)

export default function AiInput({ value, setValue, handleKeyPress }) {
  // const [setValue] = useState("")
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  });
  const [showSearch, setShowSearch] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handelClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
    setImagePreview(null); // Use null instead of empty string
  };

  const handelChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    setValue("");
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
    <div className="w-full py-4 px-4">
      <div className="relative max-w-2xl border rounded-3xl border-slate-600/30 p-1.5 w-full mx-auto shadow-2xl bg-slate-800/50 backdrop-blur-xl">
        <div className="relative rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-600/40 shadow-lg focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all duration-300 text-white">
          <div
            className="overflow-y-auto"
            style={{ maxHeight: `${MAX_HEIGHT}px` }}
          >
            <div className="relative">
              <Textarea
                id="ai-input-04"
                value={value}
                placeholder=""
                className="w-full rounded-2xl rounded-b-none px-5 py-4 bg-transparent border-none text-slate-100 placeholder:text-slate-400 resize-none focus-visible:ring-0 leading-relaxed text-base"
                ref={textareaRef}
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
              />
              {!value && (
                <div className="absolute left-5 top-4">
                  <AnimatedPlaceholder showSearch={showSearch} />
                </div>
              )}
            </div>
          </div>

          <div className="h-14 bg-slate-800/30 rounded-b-2xl border-t border-slate-600/20">
            <div className="absolute left-4 bottom-4 flex items-center gap-3">
              <label
                className={cn(
                  "cursor-pointer relative rounded-xl p-2.5 transition-all duration-200 hover:scale-110",
                  imagePreview
                    ? "bg-orange-500/20 border border-orange-500/50 text-orange-400"
                    : "bg-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-600/50"
                )}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handelChange}
                  className="hidden"
                />
                <Paperclip
                  className={cn(
                    "w-4 h-4 transition-colors duration-200",
                    imagePreview ? "text-orange-400" : "text-slate-400"
                  )}
                />
                {imagePreview && (
                  <div className="absolute w-[120px] h-[120px] top-16 -left-4 rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-500/30">
                    <Image
                      className="object-cover w-full h-full"
                      src={imagePreview || "/picture1.jpeg"}
                      height={500}
                      width={500}
                      alt="additional image"
                    />
                    <button
                      onClick={handelClose}
                      className="bg-slate-800 text-slate-200 absolute -top-2 -right-2 shadow-xl rounded-full rotate-45 w-6 h-6 flex items-center justify-center hover:bg-slate-700 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowSearch(!showSearch);
                }}
                className={cn(
                  "rounded-xl transition-all duration-200 flex items-center gap-2 px-3 py-2 border h-9 hover:scale-105",
                  showSearch
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "bg-slate-700/50 border-slate-600/30 text-slate-400 hover:text-slate-200 hover:bg-slate-600/50"
                )}
              >
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <motion.div
                    animate={{
                      rotate: showSearch ? 180 : 0,
                      scale: showSearch ? 1.1 : 1,
                    }}
                    whileHover={{
                      rotate: showSearch ? 180 : 15,
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                    }}
                  >
                    <Globe
                      className={cn(
                        "w-4 h-4",
                        showSearch ? "text-cyan-400" : "text-inherit"
                      )}
                    />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {showSearch && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: "auto",
                        opacity: 1,
                      }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm overflow-hidden whitespace-nowrap text-cyan-400 flex-shrink-0 font-medium"
                    >
                      Search
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <div className="absolute right-4 bottom-4">
              <button
                type="button"
                onClick={handleSubmit}
                className={cn(
                  "rounded-xl p-3 transition-all duration-200 hover:scale-110 shadow-lg",
                  value
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50"
                    : "bg-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-600/50"
                )}
              >
                <Send className={cn("w-4 h-4 cursor-pointer transition-colors", value ? "text-white" : "text-slate-400")} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
