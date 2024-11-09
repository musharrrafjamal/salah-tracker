"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MoonStar } from "lucide-react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      className="w-16 h-9 bg-neutral-200 dark:bg-neutral-600 rounded-full px-1 flex items-center"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        className="bg-white dark:bg-neutral-800 rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === "light" ? 0 : 28,
          width: theme === "light" ? 28 : 28,
          height: theme === "light" ? 28 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 40,
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={"text-black dark:text-white"}
          animate={{
            rotate: theme === "light" ? 0 : 260,
            scale: theme === "light" ? 1 : 0.75,
          }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
        >
          {theme === "light" ? (
            <>
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </>
          ) : (
            <MoonStar />
          )}
        </motion.svg>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
