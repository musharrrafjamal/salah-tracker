"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle, CheckCircle, Clock, X } from "lucide-react";

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
import { DateSelector } from "./DateSelector";
import { Badge } from "@/components/shadcn/ui/badge";
import { Progress } from "@/components/shadcn/ui/progress";

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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Calculate individual rates
  const calculateRates = (stats: PrayerStats) => {
    const prayedRate = stats.prayed * 20 + stats.late * 10;
    const lateRate = stats.late * 10;
    const remainingRate = 100 - (prayedRate + lateRate);

    return {
      prayedRate: Math.min(prayedRate, 100),
      lateRate: Math.min(lateRate, 100 - prayedRate),
      notPrayedRate: Math.max(0, remainingRate),
    };
  };

  const { prayedRate, lateRate, notPrayedRate } = calculateRates(stats);
  const completionRate = prayedRate;

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

  const prayerStatusConfig = {
    prayed: {
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-green-500",
      bgColor: "bg-green-100",
      label: "Prayed",
    },
    late: {
      icon: <Clock className="w-5 h-5" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      label: "Late",
    },
    notPrayed: {
      icon: <X className="w-5 h-5" />,
      color: "text-red-500",
      bgColor: "bg-red-100",
      label: "Not Prayed",
    },
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          {title}
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DateSelector date={selectedDate} onDateChange={setSelectedDate} />
        <div className="h-52 relative">
          <ResponsiveContainer width="100%" height="120%">
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
                outerRadius={90}
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center">
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
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(stats).map(([key, value], index) => (
            <Card key={key} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs font-semibold",
                      prayerStatusConfig[key as keyof typeof prayerStatusConfig]
                        .color,
                      prayerStatusConfig[key as keyof typeof prayerStatusConfig]
                        .bgColor
                    )}
                  >
                    {
                      prayerStatusConfig[key as keyof typeof prayerStatusConfig]
                        .label
                    }
                  </Badge>
                  {
                    prayerStatusConfig[key as keyof typeof prayerStatusConfig]
                      .icon
                  }
                </div>
                <div className="text-3xl font-bold mb-2">{value}</div>
                <Progress
                  value={
                    calculateRates(stats)[
                      `${key}Rate` as keyof ReturnType<typeof calculateRates>
                    ]
                  }
                  className={cn(
                    "h-2 mb-2",
                    key === "prayed" && "[&>div]:bg-green-500",
                    key === "late" && "[&>div]:bg-yellow-500",
                    key === "notPrayed" && "[&>div]:bg-red-500"
                  )}
                />
                <div className="text-sm text-gray-500">
                  {calculateRates(stats)[
                    `${key}Rate` as keyof ReturnType<typeof calculateRates>
                  ].toFixed(1)}
                  % of total
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
