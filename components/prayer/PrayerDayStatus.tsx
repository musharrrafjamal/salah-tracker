"use client";

import { motion } from "framer-motion";
import { SalahIndicatorBar } from "./SalahIndicatorBar";
import { useState } from "react";
import { CloudSun, Moon, Sun, Sunrise, Sunset } from "lucide-react";

interface Prayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  status: "prayed" | "late" | "not-prayed";
}

interface PrayerDayStatusProps {
  prayers?: Prayer[];
  className?: string;
}

export function PrayerDayStatus({ className = "" }: PrayerDayStatusProps) {
  const [prayers, setPrayers] = useState<Prayer[]>([
    {
      id: "fajr",
      name: "FAJR",
      icon: <Sunrise className="w-5 h-5 text-emerald-500" />,
      iconColor: "bg-emerald-50",
      status: "prayed",
    },
    {
      id: "dhuhr",
      name: "DHUHR",
      icon: <CloudSun className="w-5 h-5 text-sky-500" />,
      iconColor: "bg-sky-50",
      status: "late",
    },
    {
      id: "asr",
      name: "ASR",
      icon: <Sun className="w-5 h-5 text-pink-500" />,
      iconColor: "bg-pink-50",
      status: "prayed",
    },
    {
      id: "maghrib",
      name: "MAGHRIB",
      icon: <Sunset className="w-5 h-5 text-orange-500" />,
      iconColor: "bg-orange-50",
      status: "not-prayed",
    },
    {
      id: "isha",
      name: "ISHA",
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      iconColor: "bg-indigo-50",
      status: "prayed",
    },
  ]);
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex flex-col justify-between">
      {prayers.map((prayer, index) => (
        <motion.div key={prayer.id} variants={itemVariants} custom={index}>
          <SalahIndicatorBar
            name={prayer.name}
            icon={prayer.icon}
            status={prayer.status}
            iconColor={prayer.iconColor}
          />
        </motion.div>
      ))}
    </div>
  );
}
