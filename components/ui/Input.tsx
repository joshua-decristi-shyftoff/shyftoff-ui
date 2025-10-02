import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, FunctionComponent, InputHTMLAttributes } from "react";

import { cn } from "@/lib/Utils";

type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref">>;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  endIcon?: Icon;
  startIcon?: Icon;
};

const Input: FunctionComponent<InputProps> = ({ className, endIcon: EndIcon, startIcon: StartIcon, type, ...props }) => (
  <div className={cn(
    "relative flex items-center w-full",
    className,
  )}
  >
    { !!StartIcon && (
      <span className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
        <StartIcon className="w-4 h-4" />
      </span>
    )}
    <input
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        StartIcon ? "pl-10" : "",
        EndIcon ? "pr-10" : "",
      )}
      data-slot="input"
      type={type}
      {...props}
    />
    {!!EndIcon && (
      <span className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
        <EndIcon className="w-4 h-4" />
      </span>
    )}
  </div>
);

export { Input };
