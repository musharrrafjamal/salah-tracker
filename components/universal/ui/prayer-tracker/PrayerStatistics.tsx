"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Calendar, Award, TrendingUp } from 'lucide-react';
import { Progress } from "@/components/shadcn/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shadcn/ui/tooltip";
import { cn } from "@/lib/utils";

interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalPrayers: number;
  streakProgress: number;
}

interface StreakDisplayProps {
  className?: string;
  onStreakUpdate?: (stats: StreakStats) => void;
}

export function PrayerStatistics({ className, onStreakUpdate }: StreakDisplayProps) {
  const [stats, setStats] = useState<StreakStats>({
    currentStreak: 0,
    longestStreak: 0,
    totalPrayers: 0,
    streakProgress: 0,
  });

  useEffect(() => {
    // Simulating an API call to fetch streak data
    const fetchStreakData = async () => {
      // In a real app, replace this with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newStats: StreakStats = {
        currentStreak: 7,
        longestStreak: 14,
        totalPrayers: 35,
        streakProgress: 70,
      };
      setStats(newStats);
      onStreakUpdate?.(newStats);
    };

    fetchStreakData();
  }, [onStreakUpdate]);

  const streakVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const flameVariants = {
    idle: {
      scale: 1,
      rotate: 0,
    },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={cn(
        "bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-2xl p-6 shadow-lg w-full overflow-hidden",
        className
      )}
    >
      <h2 className="text-2xl font-bold mb-4">Prayer Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {Object.entries(stats).map(([key, value], index) => (
            <motion.div
              key={key}
              variants={streakVariants}
              custom={index}
              className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between">
                      {key === "currentStreak" && <Flame className="w-5 h-5" />}
                      {key === "longestStreak" && <Award className="w-5 h-5" />}
                      {key === "totalPrayers" && <Calendar className="w-5 h-5" />}
                      {key === "streakProgress" && <TrendingUp className="w-5 h-5" />}
                      <span className="text-lg font-semibold">
                        {key === "streakProgress" ? `${value}%` : value}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Prayer progress</span>
          <span className="text-sm font-medium">{stats.streakProgress}%</span>
        </div>
        <Progress value={stats.streakProgress} className="h-2 bg-white/60" color="bg-white" />
      </motion.div>
    </motion.div>
  );
}
