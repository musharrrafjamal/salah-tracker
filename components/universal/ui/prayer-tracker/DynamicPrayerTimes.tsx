"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  CloudSun,
  Clock,
  Settings,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Slider } from "@/components/shadcn/ui/slider";
import { Switch } from "@/components/shadcn/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/shadcn/ui/dialog";
import { calculatePrayerTimes, adjustPrayerTime } from "@/lib/prayerUtils";
import { formatTimeToString, getTimeLeftString } from "@/lib/timeUtils";

const prayerIcons: Record<string, React.ElementType> = {
  Fajr: Sunrise,
  Dhuhr: CloudSun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

export function DynamicPrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<Record<string, Date>>({});
  const [nextPrayer, setNextPrayer] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});
  const [use24HourFormat, setUse24HourFormat] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const times = calculatePrayerTimes(currentTime, adjustments);
    setPrayerTimes(times);

    const sortedPrayers = Object.entries(times).sort(
      (a, b) => a[1].getTime() - b[1].getTime()
    );
    const next =
      sortedPrayers.find(([_, time]) => time > currentTime) || sortedPrayers[0];
    setNextPrayer(next[0]);

    const timeDiff = next[1].getTime() - currentTime.getTime();
    setTimeLeft(getTimeLeftString(timeDiff));
  }, [currentTime, adjustments]);

  const Icon = prayerIcons[nextPrayer as keyof typeof prayerIcons];

  const handleAdjustment = (prayer: string, value: number[]) => {
    setAdjustments((prev) => ({ ...prev, [prayer]: value[0] }));
  };

  return (
    <Card className="w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Prayer Times</h2>
          <ResponsiveModal>
            <ResponsiveModalTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent>
              <ResponsiveModalHeader>
                <ResponsiveModalTitle>Adjust Prayer Times</ResponsiveModalTitle>
              </ResponsiveModalHeader>
              <div className="space-y-4">
                {Object.keys(prayerTimes).map((prayer) => (
                  <div key={prayer} className="space-y-2">
                    <label className="text-sm font-medium">{prayer}</label>
                    <Slider
                      min={-30}
                      max={30}
                      step={1}
                      value={[adjustments[prayer] || 0]}
                      onValueChange={(value) => handleAdjustment(prayer, value)}
                    />
                    <span className="text-sm">
                      {adjustments[prayer] || 0} minutes
                    </span>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="24-hour"
                    checked={use24HourFormat}
                    onCheckedChange={setUse24HourFormat}
                  />
                  <label htmlFor="24-hour">Use 24-hour format</label>
                </div>
              </div>
            </ResponsiveModalContent>
          </ResponsiveModal>
        </div>

        <div className="space-y-6">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-2">Next Prayer</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-primary">{nextPrayer}</p>
                <p className="text-lg text-muted-foreground">{timeLeft}</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {Icon && <Icon size={48} className="text-primary" />}
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(prayerTimes).map(([prayer, time], index) => (
              <motion.div
                key={prayer}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex justify-between items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  {prayer in prayerIcons && (
                    <Icon
                      component={
                        prayerIcons[prayer as keyof typeof prayerIcons]
                      }
                      className="h-6 w-6 text-primary"
                    />
                  )}
                  <span className="font-medium">{prayer}</span>
                </div>
                <span>{formatTimeToString(time, use24HourFormat)}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-2xl font-semibold">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: !use24HourFormat,
              })}
            </p>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString([], {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
