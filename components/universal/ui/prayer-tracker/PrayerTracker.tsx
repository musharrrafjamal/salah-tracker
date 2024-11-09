"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { PrayerLegend } from "./PrayerLegend";
import { PrayerBar } from "./PrayerBar";

interface Prayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  status: "prayed" | "late" | "not-prayed";
}

interface PrayerTrackerProps {
  className?: string;
  onStatusChange?: (
    prayerId: string,
    status: "prayed" | "late" | "not-prayed"
  ) => void;
}

export function PrayerTracker({
  className = "",
  onStatusChange,
}: PrayerTrackerProps) {
  const [prayers, setPrayers] = useState<Prayer[]>([
    {
      id: "fajr",
      name: "FAJR",
      icon: <Sunrise className="w-5 h-5 text-lime-500" />,
      iconColor: "bg-lime-50",
      status: "prayed",
    },
    {
      id: "dhuhr",
      name: "DHUHR",
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      iconColor: "bg-amber-50",
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
      icon: <Moon className="w-5 h-5 text-blue-500" />,
      iconColor: "bg-blue-50",
      status: "prayed",
    },
  ]);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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

  const handleStatusChange = (
    prayerId: string,
    newStatus: "prayed" | "late" | "not-prayed"
  ) => {
    setPrayers((prev) =>
      prev.map((prayer) =>
        prayer.id === prayerId ? { ...prayer, status: newStatus } : prayer
      )
    );
    onStatusChange?.(prayerId, newStatus);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`max-w-full border rounded-xl mx-auto p-8 ${className}`}
    >
      <motion.div variants={itemVariants}>
        <PrayerLegend />
      </motion.div>
      <motion.div layout className="space-y-3">
        <AnimatePresence>
          {prayers.map((prayer, index) => (
            <motion.div key={prayer.id} variants={itemVariants} custom={index}>
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
      <motion.div variants={itemVariants} className="mt-4">
        <Button
          variant="ghost"
          className="w-full py-6 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New
        </Button>
      </motion.div>
    </motion.div>
  );
}
