"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface PrayerStats {
  prayed: number;
  late: number;
  notPrayed: number;
}

interface GaugeChartProps {
  stats: PrayerStats;
  className?: string;
  colors?: {
    prayed: string;
    late: string;
    notPrayed: string;
  };
  title?: string;
}

export default function GaugeChart({
  stats,
  className = "",
  colors = {
    prayed: "hsl(152, 82%, 47%)",
    late: "hsl(0, 0%, 80%)",
    notPrayed: "hsl(4, 90%, 58%)",
  },
  title = "Daily Prayer Statistics",
}: GaugeChartProps) {
  // Calculate individual rates
  const calculateRates = (stats: PrayerStats) => {
    const prayedRate = stats.prayed * 20;
    const lateRate = stats.late * 10;
    const remainingRate = 100 - (prayedRate + lateRate);

    return {
      prayedRate: Math.min(prayedRate, 100),
      lateRate: Math.min(lateRate, 100 - prayedRate),
      remainingRate: Math.max(0, remainingRate),
    };
  };

  const { prayedRate, lateRate, remainingRate } = calculateRates(stats);
  const completionRate = prayedRate + lateRate;

  // Create segments for the gauge
  const data = [
    { name: "Prayed", value: prayedRate, color: colors.prayed },
    { name: "Late", value: lateRate, color: colors.late },
    { name: "Remaining", value: remainingRate, color: colors.notPrayed },
  ].filter((segment) => segment.value > 0);

  return (
    <div className={`${className} border rounded-2xl`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={completionRate}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <p className="text-3xl font-bold">
                  {completionRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Completion Rate</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between items-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-600">Prayed</span>
            <span className="text-xl font-bold text-green-500">
              {stats.prayed}
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-600">Late</span>
            <span className="text-xl font-bold text-gray-400">
              {stats.late}
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-600">Not Prayed</span>
            <span className="text-xl font-bold text-red-500">
              {stats.notPrayed}
            </span>
          </motion.p>
        </div>
      </CardContent>
    </div>
  );
}
