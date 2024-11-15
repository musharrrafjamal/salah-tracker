"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardHeader, CardTitle } from "../shadcn/ui/card";

interface ProgressBarProps {
  value: number;
  status: "prayed" | "not-prayed" | "late";
  showLabel?: boolean;
  height?: number;
  width?: number;
  className?: string;
  animate?: boolean;
}

interface ProgressGroupProps {
  items: {
    value: number;
    status: "prayed" | "not-prayed" | "late";
  }[];
  className?: string;
  showLabels?: boolean;
  barWidth?: number;
  barHeight?: number;
  animate?: boolean;
}

const statusConfig = {
  prayed: {
    label: "Prayed",
    color: "bg-emerald-500",
    trackColor: "bg-emerald-100 dark:bg-emerald-950/30",
  },
  late: {
    label: "Late",
    color: "bg-gray-400",
    trackColor: "bg-gray-100 dark:bg-gray-800",
  },
  "not-prayed": {
    label: "Not Prayed",
    color: "bg-red-500",
    trackColor: "bg-red-100 dark:bg-red-950/30",
  },
};

function ProgressBar({
  value,
  status,
  showLabel = true,
  height = 240,
  width = 60,
  className,
  animate = true,
}: ProgressBarProps) {
  const config = statusConfig[status];

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        className="relative rounded-full overflow-hidden"
        style={{ height, width }}
      >
        {/* Track */}
        <div className={cn("absolute inset-0", config.trackColor)} />

        {/* Progress */}
        <motion.div
          initial={animate ? { height: 0 } : false}
          animate={{ height: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "absolute bottom-0 left-0 right-0 rounded-full",
            config.color
          )}
        />

        {/* Decorative Elements */}
        <motion.div
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
      </div>
      {showLabel && (
        <motion.span
          initial={animate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          {config.label}
        </motion.span>
      )}
    </div>
  );
}

export function PrayerBarChart({
  items,
  className,
  showLabels = true,
  barWidth = 60,
  barHeight = 240,
  animate = true,
}: ProgressGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex flex-col p-4 pt-0 pb-6 gap-4 bg-white dark:bg-gray-900 border rounded-2xl",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Daily prayer statistics
        </CardTitle>
      </CardHeader>
      <div className="flex gap-4 justify-center">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={animate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProgressBar
              value={item.value}
              status={item.status}
              showLabel={showLabels}
              height={barHeight}
              width={barWidth}
              animate={animate}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
