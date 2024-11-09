"use client";

import { motion } from "framer-motion";
import { Check, Clock, X } from "lucide-react";

interface LegendItem {
  icon: React.ReactNode;
  label: string;
  color: keyof typeof colorClasses;
}

const legendItems: LegendItem[] = [
  {
    icon: <Check className="w-4 h-4" />,
    label: "Prayed",
    color: "emerald",
  },
  {
    icon: <Clock className="w-4 h-4" />,
    label: "Late",
    color: "neutral",
  },
  {
    icon: <X className="w-4 h-4" />,
    label: "Not Prayed",
    color: "red",
  },
];

const colorClasses = {
  emerald: {
    bgLight: "bg-emerald-100",
    bgDark: "bg-emerald-900/20",
    textLight: "text-emerald-500",
    textDark: "text-emerald-400",
    labelText: "text-emerald-700 dark:text-emerald-300",
  },
  neutral: {
    bgLight: "bg-neutral-100",
    bgDark: "bg-neutral-900/20",
    textLight: "text-neutral-500",
    textDark: "text-neutral-400",
    labelText: "text-neutral-700 dark:text-neutral-300",
  },
  red: {
    bgLight: "bg-red-100",
    bgDark: "bg-red-900/20",
    textLight: "text-red-500",
    textDark: "text-red-400",
    labelText: "text-red-700 dark:text-red-300",
  },
};

export function PrayerLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-4 mb-6 px-2 py-3 bg-white dark:bg-neutral-800 rounded-lg md:hidden"
    >
      {legendItems.map((item) => {
        const colors = colorClasses[item.color];
        return (
          <motion.div
            key={item.label}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center ${colors.bgLight} dark:${colors.bgDark}`}
            >
              <div className={`${colors.textLight} dark:${colors.textDark}`}>
                {item.icon}
              </div>
            </div>
            <span
              className={`text-xs sm:text-sm font-normal ${colors.labelText}`}
            >
              {item.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
