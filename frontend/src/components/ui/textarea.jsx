import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-[#3a3a3a] placeholder:text-gray-400 focus-visible:border-[#4a4a4a] focus-visible:ring-2 focus-visible:ring-white/20 bg-transparent flex field-sizing-content min-h-16 w-full rounded-md border text-white px-3 py-2 text-base transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Textarea }
