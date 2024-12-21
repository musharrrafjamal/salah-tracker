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
import { PrayerCard } from "./PrayerCard";
import { PrayerLegend } from "./PrayerLegend";

type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

const prayerIcons: Record<string, React.ElementType> = {
  Fajr: Sunrise,
  Dhuhr: CloudSun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

interface Prayer {
  id: string;
  name: PrayerName;
  icon: React.ReactNode;
  iconColor: string;
  status: "prayed" | "late" | "not-prayed";
  time: Date;
  adjustment: number;
}

export function DynamicPrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [use24HourFormat, setUse24HourFormat] = useState(false);

  const initialTimes = calculatePrayerTimes(new Date(), {});
  const [prayers, setPrayers] = useState<Prayer[]>([
    {
      id: "fajr",
      name: "Fajr",
      icon: <Sunrise className="w-5 h-5 text-emerald-500" />,
      iconColor: "bg-emerald-50",
      status: "not-prayed",
      time: initialTimes.Fajr,
      adjustment: 0,
    },
    {
      id: "dhuhr",
      name: "Dhuhr",
      icon: <CloudSun className="w-5 h-5 text-sky-500" />,
      iconColor: "bg-sky-50",
      status: "not-prayed",
      time: initialTimes.Dhuhr,
      adjustment: 0,
    },
    {
      id: "asr",
      name: "Asr",
      icon: <Sun className="w-5 h-5 text-pink-500" />,
      iconColor: "bg-pink-50",
      status: "not-prayed",
      time: initialTimes.Asr,
      adjustment: 0,
    },
    {
      id: "maghrib",
      name: "Maghrib",
      icon: <Sunset className="w-5 h-5 text-orange-500" />,
      iconColor: "bg-orange-50",
      status: "not-prayed",
      time: initialTimes.Maghrib,
      adjustment: 0,
    },
    {
      id: "isha",
      name: "Isha",
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      iconColor: "bg-indigo-50",
      status: "not-prayed",
      time: initialTimes.Isha,
      adjustment: 0,
    },
  ]);

  const calculateNextPrayer = () => {
    const now = new Date();
    return prayers.find((prayer) => prayer.time > now) || prayers[0];
  };

  const adjustmentsString = prayers.map((p) => p.adjustment).join(",");

  useEffect(() => {
    const adjustments = Object.fromEntries(
      prayers.map((prayer) => [prayer.name, prayer.adjustment])
    );
    const newTimes = calculatePrayerTimes(currentTime, adjustments);

    const hasTimeChanges = prayers.some(
      (prayer) => prayer.time.getTime() !== newTimes[prayer.name].getTime()
    );

    if (hasTimeChanges) {
      setPrayers((prev) =>
        prev.map((prayer) => ({
          ...prayer,
          time: newTimes[prayer.name],
        }))
      );
    }
  }, [currentTime, prayers]);

  const handleAdjustment = (prayerId: string, value: number[]) => {
    setPrayers((prev) =>
      prev.map((prayer) =>
        prayer.id === prayerId ? { ...prayer, adjustment: value[0] } : prayer
      )
    );
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
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const Icon =
    prayerIcons[calculateNextPrayer().name as keyof typeof prayerIcons];

  return (
    <Card className="w-full shadow-none border-none dark:from-blue-900 dark:to-purple-900">
      <CardContent className="space-y-6 p-0">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border flex justify-between"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">Next Prayer</h3>
            <div className="flex items-center space-x-2">
              {Icon && (
                <div
                  className={`p-2 rounded-lg flex items-center justify-center ${
                    calculateNextPrayer().iconColor
                  }`}
                >
                  <Icon
                    size={48}
                    className={`w-12 h-12 ${
                      calculateNextPrayer().name === "Fajr"
                        ? "text-emerald-500"
                        : calculateNextPrayer().name === "Dhuhr"
                        ? "text-sky-500"
                        : calculateNextPrayer().name === "Asr"
                        ? "text-pink-500"
                        : calculateNextPrayer().name === "Maghrib"
                        ? "text-orange-500"
                        : "text-indigo-500"
                    }`}
                  />
                </div>
              )}
              <div>
                <p className="text-3xl font-bold text-primary">
                  {calculateNextPrayer().name}
                </p>
                <p className="text-lg text-muted-foreground">
                  {getTimeLeftString(
                    calculateNextPrayer().time.getTime() - currentTime.getTime()
                  )}
                </p>
              </div>
            </div>
          </div>
          <ResponsiveModal>
            <ResponsiveModalTrigger asChild>
              <Button variant="secondary" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent>
              <ResponsiveModalHeader>
                <ResponsiveModalTitle>Adjust Prayer Times</ResponsiveModalTitle>
              </ResponsiveModalHeader>
              <div className="space-y-4">
                {prayers.map((prayer, index) => (
                  <div key={prayer.id} className="space-y-2">
                    <label className="text-sm font-medium">{prayer.name}</label>
                    <Slider
                      min={-30}
                      max={30}
                      step={1}
                      value={[prayer.adjustment]}
                      onValueChange={(value) =>
                        handleAdjustment(prayer.id, value)
                      }
                    />
                    <span className="text-sm">{prayer.adjustment} minutes</span>
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
        </motion.div>
        
        <PrayerLegend />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {prayers.map((prayer, index) => (
            <PrayerCard
              key={prayer.id}
              prayer={prayer}
              formatTimeToString={formatTimeToString}
              use24HourFormat={use24HourFormat}
              onStatusChange={handleStatusChange}
            />
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
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
