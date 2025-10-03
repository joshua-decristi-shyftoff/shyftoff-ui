import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind-aware conflict resolution.
 *
 * @param inputs - Class values (strings, arrays, objects)
 * @returns Merged class string
 *
 * @example
 * cn("px-4", "py-2", { "text-white": isActive })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
