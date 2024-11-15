"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface StreakCardProps {
  streak?: number;
  title?: string;
  className?: string;
  svg?: React.ReactNode;
  accentColor?: string;
  elementsBgColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export function StreakCard({
  streak = 7,
  title = "Current Streak",
  className = "",
  svg,
  accentColor = "text-orange-500",
  elementsBgColor,
  backgroundColor = "bg-white dark:bg-gray-800",
  textColor = "text-gray-800 dark:text-gray-100",
}: StreakCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border dark:border-gray-700/50 ${backgroundColor} ${className}`}
    >
      {/* Decorative Elements */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${elementsBgColor} rounded-full -translate-y-1/2 translate-x-1/2`}
      />
      <div
        className={`absolute bottom-0 left-0 w-24 h-24 ${elementsBgColor} rounded-full translate-y-1/2 -translate-x-1/2`}
      />

      <div className="relative p-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-medium mb-8 ${textColor}`}
        >
          {title}
        </motion.h2>

        <div className="flex items-center justify-between">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Prayer Figure */}
            {/* <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              className={accentColor}
            >
              <path
                d="M12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM12 18C10.9 18 10 18.9 10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20C14 18.9 13.1 18 12 18ZM12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11Z"
                fill="currentColor"
              />
            </svg> */}
            <div className="ml-6">{svg}</div>

            {/* Animated Sparkles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className={`w-6 h-6 ${accentColor}`} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-8xl font-bold ${accentColor}`}
          >
            {streak}
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-12 right-12 w-4 h-4 rounded-full ${elementsBgColor}`}
          />
          <div
            className={`absolute bottom-20 left-10 w-3 h-3 rounded-full ${elementsBgColor}`}
          />
          <div
            className={`absolute top-1/2 left-1/4 w-2 h-2 rounded-full ${elementsBgColor}`}
          />
        </div>
      </div>
    </motion.div>
  );
}
