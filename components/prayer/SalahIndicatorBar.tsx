"use client";

import { motion } from "framer-motion";

interface PrayerBarProps {
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  status: string;
  className?: string;
}

export function SalahIndicatorBar({
  name,
  icon,
  iconColor,
  status,
  className = "",
}: PrayerBarProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800/50 shadow-sm border border-gray-100 dark:border-gray-700/50 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconColor}`}
        >
          {icon}
        </div>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {name}
        </span>
      </div>
      <div>{status}</div>
    </motion.div>
  );
}
