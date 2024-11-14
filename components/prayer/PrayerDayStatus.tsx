"use client";

import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";

interface Prayer {
  name: string;
  status: "completed" | "missed" | "pending";
}

interface PrayerDayStatusProps {
  date?: number;
  prayers?: Prayer[];
  className?: string;
  onStatusChange?: (
    prayerName: string,
    status: "completed" | "missed" | "pending"
  ) => void;
  dateBackgroundColor?: string;
  completedColor?: string;
  missedColor?: string;
  pendingColor?: string;
}

export function PrayerDayStatus({
  date = new Date().getDate(),
  prayers = [
    { name: "FAJR", status: "completed" },
    { name: "DHUHR", status: "missed" },
    { name: "ASR", status: "completed" },
    { name: "MAGHRIB", status: "pending" },
    { name: "ISHA", status: "completed" },
  ],
  className = "",
  onStatusChange,
  dateBackgroundColor = "bg-emerald-50 dark:bg-emerald-900/20",
  completedColor = "bg-emerald-50 dark:bg-emerald-900/20",
  missedColor = "bg-red-50 dark:bg-red-900/20",
  pendingColor = "bg-gray-100 dark:bg-gray-800",
}: PrayerDayStatusProps) {
  const getStatusIcon = (status: Prayer["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
        );
      case "missed":
        return <X className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "pending":
        return <Minus className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getStatusBackground = (status: Prayer["status"]) => {
    switch (status) {
      case "completed":
        return completedColor;
      case "missed":
        return missedColor;
      case "pending":
        return pendingColor;
    }
  };

  return (
    <div className={`flex items-stretch gap-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center justify-center w-24 h-24 ${dateBackgroundColor} rounded-2xl text-4xl font-medium text-gray-700 dark:text-gray-200`}
      >
        {date}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6"
      >
        <div className="grid grid-cols-5 gap-4">
          {prayers.map((prayer, index) => (
            <motion.div
              key={prayer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1 },
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {prayer.name}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const nextStatus =
                    prayer.status === "completed"
                      ? "missed"
                      : prayer.status === "missed"
                      ? "pending"
                      : "completed";
                  onStatusChange?.(prayer.name, nextStatus);
                }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusBackground(
                  prayer.status
                )} transition-colors duration-200`}
              >
                {getStatusIcon(prayer.status)}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
