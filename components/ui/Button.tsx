import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Common = {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  /** A lucide icon element, placed after the label. */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = Common & {
  href: string;
  /** Opens in a new tab; used for PDFs. */
  external?: boolean;
};

type NativeButtonProps = Common &
  Omit<ComponentPropsWithoutRef<"button">, keyof Common> & { href?: undefined };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", icon, children, className } = props;
  // Full class names, so Tailwind's content scan keeps them.
  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  const sizeClass = size === "lg" ? "btn-lg" : "btn-md";
  const classes = cn("btn", variantClass, sizeClass, className);
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  const { variant: _variant, size: _size, icon: _icon, children: _children, className: _className, type, ...rest } =
    props;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {content}
    </button>
  );
}
