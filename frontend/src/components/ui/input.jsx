import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-white placeholder:text-gray-400 bg-[#2a2a2a] border-[#3a3a3a] flex h-9 w-full min-w-0 rounded-md border text-white px-3 py-1 text-base transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[#4a4a4a] focus-visible:ring-2 focus-visible:ring-white/20",
        className
      )}
      {...props} />
  );
}

export { Input }
