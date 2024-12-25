"use client";

import { motion } from "framer-motion";
import { PrayerTracker } from "./PrayerTracker";
import { PrayerStatistics } from "./PrayerStatistics";
import { InspirationQuote } from "./InspirationQuote";
import { NoteTaker } from "./note/NoteTaker";

export function PrayerTrackerContainer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-11/12 mx-auto space-y-8"
    >
      <PrayerTracker />

      <div className="w-full max-h-full flex space-x-4">
        <PrayerStatistics
          onStreakUpdate={(stats) => console.log("Streak updated:", stats)}
        />
        <NoteTaker />
      </div>
    </motion.div>
  );
}
