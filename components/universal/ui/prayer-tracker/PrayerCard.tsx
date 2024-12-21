"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sunrise, Sun, Sunset, Moon, CloudSun, CheckCircle2, Clock, XCircle, HelpCircle } from 'lucide-react';
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shadcn/ui/tooltip";
import { cn } from "@/lib/utils";

type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

interface Prayer {
  id: string;
  name: PrayerName;
  status: "prayed" | "late" | "not-prayed";
  time: Date;
  adjustment: number;
}

interface PrayerCardProps {
  prayer: Prayer;
  formatTimeToString: (time: Date, use24HourFormat: boolean) => string;
  use24HourFormat: boolean;
  onStatusChange?: (prayerId: string, status: "prayed" | "late" | "not-prayed") => void;
}

const prayerIcons: Record<PrayerName, React.ElementType> = {
  Fajr: Sunrise,
  Dhuhr: CloudSun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

const statusConfig = {
  prayed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
  late: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  "not-prayed": { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
};

export function PrayerCard({
  prayer,
  formatTimeToString,
  use24HourFormat,
  onStatusChange,
}: PrayerCardProps) {
  const Icon = prayerIcons[prayer.name];
  const { icon: StatusIcon, color, bg } = statusConfig[prayer.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className={cn("p-2 rounded-full", bg)}>
                    <Icon className={cn("w-5 h-5", color)} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{prayer.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {prayer.name}
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-100">
                {formatTimeToString(prayer.time, use24HourFormat)}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full p-2",
                  bg,
                  color
                )}
              >
                <StatusIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange?.(prayer.id, "prayed")}>
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
                Mark as Prayed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange?.(prayer.id, "late")}>
                <Clock className="w-4 h-4 mr-2 text-amber-500" />
                Mark as Late
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange?.(prayer.id, "not-prayed")}>
                <XCircle className="w-4 h-4 mr-2 text-red-500" />
                Mark as Not Prayed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
