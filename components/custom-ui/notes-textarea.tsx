import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `
            flex 
            min-h-[60px] w-full 
            rounded-md border-0 
            bg-transparent 
            px-3 py-2 
            text-base shadow-0 
            placeholder:text-muted-foreground 
            focus-visible:outline-none focus-visible:ring-0 
            disabled:cursor-not-allowed disabled:opacity-50 
            text-accent-foreground

        `,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
