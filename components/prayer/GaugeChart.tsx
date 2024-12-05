"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle, CheckCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { cn } from "@/lib/utils";

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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  value: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * RADIAN);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function GaugeChart({
  stats,
  className = "",
  colors = {
    prayed: "hsl(152, 82%, 47%)",
    late: "hsl(45, 93%, 47%)",
    notPrayed: "hsl(4, 90%, 58%)",
  },
  title = "Daily Prayer Statistics",
}: GaugeChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Calculate individual rates
  const calculateRates = (stats: PrayerStats) => {
    const prayedRate = stats.prayed * 20;
    const lateRate = stats.late * 10;
    const remainingRate = 100 - (prayedRate + lateRate);

    return {
      prayedRate: Math.min(prayedRate, 100),
      lateRate: Math.min(lateRate, 100 - prayedRate),
      notPrayedRate: Math.max(0, remainingRate),
    };
  };

  const { prayedRate, lateRate, notPrayedRate } = calculateRates(stats);
  const completionRate = prayedRate + lateRate;

  // Create segments for the gauge
  const data = [
    { name: "Prayed", value: prayedRate, color: colors.prayed },
    { name: "Late", value: lateRate, color: colors.late },
    { name: "Not Prayed", value: notPrayedRate, color: colors.notPrayed },
  ].filter((segment) => segment.value > 0);

  const getStatusIcon = () => {
    if (completionRate >= 90)
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (completionRate >= 70)
      return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    return <AlertTriangle className="w-6 h-6 text-red-500" />;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          {title}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
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
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {getStatusIcon()}
                </motion.div>
                <p className="text-3xl font-bold mt-2">
                  {completionRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Completion Rate</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 mt-4">
          {Object.entries(stats).map(([key, value], index) => (
            <TooltipProvider key={key}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "relative overflow-hidden transition-all duration-300",
                        key === "prayed" &&
                          "bg-gradient-to-r from-green-400 to-green-600 text-white",
                        key === "late" &&
                          "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
                        key === "notPrayed" &&
                          "bg-gradient-to-r from-red-400 to-red-600 text-white",
                        "font-semibold py-1 px-3"
                      )}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white opacity-20"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      />
                      <span className="relative z-10">{value}</span>
                    </Button>
                    <span className="text-sm text-gray-600 mt-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-gray-800 text-white p-2 rounded-md shadow-lg"
                >
                  <p>{`${
                    key.charAt(0).toUpperCase() + key.slice(1)
                  } prayers: ${value}`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
