"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function StreakDisplay() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // In a real app, you'd fetch the actual streak from a backend
    setStreak(7);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Prayer Streak</h2>
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Flame size={48} />
        </motion.div>
        <span className="text-4xl font-bold ml-4">{streak} days</span>
      </div>
    </motion.div>
  );
}
