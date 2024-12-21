"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";

interface PrayerReminderProps {
  onClose: () => void;
}

export function PrayerReminder({ onClose }: PrayerReminderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 left-6 right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">It&apos;s time for prayer!</p>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="mt-2">
        Take a moment to connect with Allah and offer your prayers.
      </p>
    </motion.div>
  );
}
