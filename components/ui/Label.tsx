"use client";

import type { ComponentProps, FunctionComponent } from "react";

import { Root as LabelPrimitive } from "@radix-ui/react-label";

import { cn } from "@/lib/Utils";

const Label: FunctionComponent<ComponentProps<typeof LabelPrimitive>> = ({ className, ...props }) => (
  <LabelPrimitive
    className={cn(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    data-slot="label"
    {...props}
  />
);

export { Label };
