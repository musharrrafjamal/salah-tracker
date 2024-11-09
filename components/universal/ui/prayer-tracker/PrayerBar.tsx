"use client";

import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

interface PrayerBarProps {
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  status: "prayed" | "late" | "not-prayed";
  onStatusChange?: (status: "prayed" | "late" | "not-prayed") => void;
  className?: string;
}

export function PrayerBar({
  name,
  icon,
  iconColor,
  status,
  onStatusChange,
  className = "",
}: PrayerBarProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "prayed":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "late":
        return "bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400";
      case "not-prayed":
        return "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";
      default:
        return "";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "prayed":
        return "Prayed";
      case "late":
        return "Late";
      case "not-prayed":
        return "Not Prayed";
      default:
        return "";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800/50 shadow-sm border border-gray-100 dark:border-gray-700/50 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconColor}`}
        >
          {icon}
        </div>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <motion.span
          layout
          className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusStyles()}`}
        >
          {getStatusText()}
        </motion.span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label="More options"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onStatusChange?.("prayed")}>
              Mark as Prayed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.("late")}>
              Mark as Late
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.("not-prayed")}>
              Mark as Not Prayed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
