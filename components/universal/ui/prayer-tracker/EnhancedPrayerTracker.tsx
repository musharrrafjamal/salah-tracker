"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { PrayerTracker } from "./PrayerTracker";
import { Sparkles } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { DynamicPrayerTimes } from "./DynamicPrayerTimes";
import { StreakDisplay } from "./StreakDisplay";
import { InspirationQuote } from "./InspirationQuote";
import { CommunityFeed } from "./CommunityFeed";
import { PrayerReminder } from "./PrayerReminder";
import { Button } from "@/components/shadcn/ui/button";

export function EnhancedPrayerTracker() {
  const [showReminder, setShowReminder] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      setShowReminder(true);
      setTimeout(() => setShowReminder(false), 10000); // Hide after 10 seconds
    }, 3600000); // Show reminder every hour

    return () => clearInterval(reminderInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-11/12 mx-auto space-y-8"
    >
      <DynamicPrayerTimes />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PrayerTracker />
        </div>
        <div className="space-y-6">
          <StreakDisplay />
          <InspirationQuote />
        </div>
      </div>

      <CommunityFeed />

      <AnimatePresence>
        {showReminder && (
          <PrayerReminder onClose={() => setShowReminder(false)} />
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6"
      >
        <Button size="lg" className="rounded-full shadow-lg">
          <Sparkles className="mr-2 h-4 w-4" />
          Earn Rewards
        </Button>
      </motion.div>
    </motion.div>
  );
}
