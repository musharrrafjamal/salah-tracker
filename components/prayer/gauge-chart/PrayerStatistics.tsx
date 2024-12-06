"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/ui/chart";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const statusConfig = {
  prayed: {
    label: "Prayed",
    color: "bg-gradient-to-r from-emerald-400 to-emerald-600",
    textColor: "text-white",
  },
  late: {
    label: "Late",
    color: "bg-gradient-to-r from-amber-400 to-amber-600",
    textColor: "text-white",
  },
  "not-prayed": {
    label: "Not Prayed",
    color: "bg-gradient-to-r from-red-400 to-red-600",
    textColor: "text-white",
  },
};

interface PrayerData {
  name: string;
  prayed: number;
  late: number;
  "not-prayed": number;
}

const generateRandomData = (): PrayerData[] => {
  return prayers.map((prayer) => ({
    name: prayer,
    prayed: Math.floor(Math.random() * 100),
    late: Math.floor(Math.random() * 50),
    "not-prayed": Math.floor(Math.random() * 30),
  }));
};

const AnimatedStatusButton = ({
  status,
  config,
  isSelected,
  onClick,
}: {
  status: string;
  config: any;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                config.color,
                config.textColor,
                "border-2 shadow-md",
                isSelected
                  ? "ring-2 ring-offset-2"
                  : "hover:ring-2 hover:ring-offset-2",
                "font-semibold py-2 px-4"
              )}
              onClick={onClick}
            >
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isSelected
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.span>
              <motion.span
                className="relative z-10"
                animate={isSelected ? { x: 10 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {config.label}
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                initial={{ x: "-100%" }}
                animate={isSelected ? { x: "100%" } : { x: "-100%" }}
                transition={{
                  duration: 1,
                  repeat: isSelected ? Infinity : 0,
                  repeatType: "loop",
                }}
              />
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-gray-800 text-white p-2 rounded-md shadow-lg"
        >
          <p>Click to {isSelected ? "unfilter" : "filter"} chart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function PrayerStatisticsChart() {
  const [data, setData] = useState<PrayerData[]>(generateRandomData());
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleStatusClick = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You would typically update your app's theme here
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Card className={cn("w-full max-w-3xl", isDarkMode ? "dark" : "")}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Prayer Statistics
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
        <CardDescription>Daily prayer performance overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            prayed: {
              label: "Prayed",
              color: "hsl(var(--chart-1))",
            },
            late: {
              label: "Late",
              color: "hsl(var(--chart-2))",
            },
            "not-prayed": {
              label: "Not Prayed",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar
                dataKey="prayed"
                stackId="a"
                fill="var(--color-prayed)"
                radius={[4, 4, 0, 0]}
                opacity={
                  selectedStatus === null || selectedStatus === "prayed"
                    ? 1
                    : 0.3
                }
              />
              <Bar
                dataKey="late"
                stackId="a"
                fill="var(--color-late)"
                radius={[4, 4, 0, 0]}
                opacity={
                  selectedStatus === null || selectedStatus === "late" ? 1 : 0.3
                }
              />
              <Bar
                dataKey="not-prayed"
                stackId="a"
                fill="var(--color-not-prayed)"
                radius={[4, 4, 0, 0]}
                opacity={
                  selectedStatus === null || selectedStatus === "not-prayed"
                    ? 1
                    : 0.3
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex flex-wrap justify-center mt-6 gap-4">
          {Object.entries(statusConfig).map(([key, config]) => (
            <AnimatedStatusButton
              key={key}
              status={key}
              config={config}
              isSelected={selectedStatus === key}
              onClick={() => handleStatusClick(key)}
            />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setData(generateRandomData())}
          >
            Generate New Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const totalPrayers = payload.reduce(
      (sum: number, entry: any) => sum + entry.value,
      0
    );
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-2">{label}</h3>
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            className="flex justify-between items-center mb-1"
          >
            <span
              className={cn(
                "font-medium",
                statusConfig[entry.dataKey as keyof typeof statusConfig]
                  .textColor
              )}
            >
              {statusConfig[entry.dataKey as keyof typeof statusConfig].label}:
            </span>
            <Badge variant="secondary">
              {entry.value} ({((entry.value / totalPrayers) * 100).toFixed(1)}%)
            </Badge>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
          <span className="font-bold">Total Prayers: {totalPrayers}</span>
        </div>
      </div>
    );
  }
  return null;
}
