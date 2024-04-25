import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  path: string;
  refActive?: React.Ref<HTMLAnchorElement>;
}

export const ActiveLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ className, path, refActive, ...props }, ref) => {
    return (
      <Link
        ref={refActive}
        className={cn(
          "block pr-3 pl-4 text-base h-8 text-zinc-600 transition hover:text-zinc-900",
          refActive && "text-secondary font-semibold",
          className
        )}
        href={path}
        {...props}
      />
    );
  }
);

// Assign a display name to the component
ActiveLink.displayName = "ActiveLink";
