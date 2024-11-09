"use client";
import React, { ReactNode } from "react";
import clsx from "clsx";

interface PrimaryButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "solid" | "outline" | "ghost";
  fullWidth?: boolean;
  withIcon?: boolean;
  icon?: ReactNode;
}

const PrimaryButton = ({
  children,
  onClick,
  className,
  size = "medium",
  variant = "solid",
  fullWidth = false,
  withIcon = false,
  icon,
}: PrimaryButtonProps) => {
  const baseStyles =
    "flex items-center justify-center gap-1 rounded-md font-medium transition-all duration-300";
  const sizeStyles = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-2",
    large: "text-md px-5 py-3",
  };

  const variantStyles = {
    solid:
      "text-white shadow-lg border-none bg-gradient-to-t from-[#FF663D] to-[#FFA380] dark:shadow-[#342a45] dark:bg-gradient-to-t dark:from-[#592cb3] dark:to-[#a364ff]",
    outline:
      "text-[#FF663D] border-2 border-[#FF663D] dark:text-[#a364ff] dark:border-[#a364ff] bg-transparent hover:bg-opacity-10",
    ghost:
      "text-[#FF663D] dark:text-[#a364ff] bg-transparent hover:bg-opacity-10",
  };

  const hoverStyles = {
    solid: "hover:scale-105 hover:bg-opacity-90",
    outline: "hover:bg-[#FFBCA6] dark:hover:bg-[#3b3060] hover:bg-opacity-20",
    ghost: "hover:bg-[#FFBCA6] dark:hover:bg-[#3b3060] hover:bg-opacity-10",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        hoverStyles[variant],
        { "w-full": fullWidth },
        className
      )}
    >
      {withIcon && icon && (
        <span className="inline-flex items-center mr-1">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default PrimaryButton;
