import * as React from "react"

import { cn } from "@/lib/utils"
import { IoIosSearch } from "react-icons/io";

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
        <div className="flex items-center gap-2 rounded-md border border-input px-3 py-1  ">
            <IoIosSearch className="stroke-neutral-500"/>
            <input
                type={type}
                className={cn(`
                    flex 
                    h-9 w-full 
                    bg-transparent text-base shadow-sm transition-colors 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground 
                    placeholder:text-muted-foreground 
                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring 
                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
                `,
                className
                )}
                ref={ref}
                {...props}
            />
        </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
