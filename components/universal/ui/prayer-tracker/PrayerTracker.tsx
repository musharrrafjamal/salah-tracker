"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sunrise, Sun, Sunset, Moon, CloudSun } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { PrayerLegend } from "./PrayerLegend";
import { PrayerBar } from "./PrayerBar";

interface Prayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  status: "prayed" | "late" | "not-prayed";
  time: string;
}

export function PrayerTracker() {
  const [prayers, setPrayers] = useState<Prayer[]>([
    {
      id: "fajr",
      name: "Fajr",
      icon: <Sunrise className="w-5 h-5 text-emerald-500" />,
      iconColor: "bg-emerald-50",
      status: "not-prayed",
      time: "05:30 AM",
    },
    {
      id: "dhuhr",
      name: "Dhuhr",
      icon: <CloudSun className="w-5 h-5 text-sky-500" />,
      iconColor: "bg-sky-50",
      status: "not-prayed",
      time: "12:30 PM",
    },
    {
      id: "asr",
      name: "Asr",
      icon: <Sun className="w-5 h-5 text-pink-500" />,
      iconColor: "bg-pink-50",
      status: "not-prayed",
      time: "03:45 PM",
    },
    {
      id: "maghrib",
      name: "Maghrib",
      icon: <Sunset className="w-5 h-5 text-orange-500" />,
      iconColor: "bg-orange-50",
      status: "not-prayed",
      time: "06:30 PM",
    },
    {
      id: "isha",
      name: "Isha",
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      iconColor: "bg-indigo-50",
      status: "not-prayed",
      time: "08:00 PM",
    },
  ]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleStatusChange = (
    prayerId: string,
    newStatus: "prayed" | "late" | "not-prayed"
  ) => {
    setPrayers((prev) =>
      prev.map((prayer) =>
        prayer.id === prayerId ? { ...prayer, status: newStatus } : prayer
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6"
    >
      <motion.div variants={itemVariants}>
        <PrayerLegend />
      </motion.div>
      <motion.div layout className="space-y-4">
        <AnimatePresence>
          {prayers.map((prayer) => (
            <motion.div key={prayer.id} variants={itemVariants} layout>
              <PrayerBar
                name={prayer.name}
                icon={prayer.icon}
                iconColor={prayer.iconColor}
                status={prayer.status}
                onStatusChange={(status) =>
                  handleStatusChange(prayer.id, status)
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
