"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PrayerTracker } from "@/components/universal/ui/prayer-tracker/PrayerTracker";
import { Calendar } from "@/components/shadcn/ui/calendar";
import { PrayerDayStatus } from "@/components/prayer/PrayerDayStatus";
import { StreakCard } from "@/components/prayer/StreakCard";
import { PrayerBarChart } from "@/components/prayer/PrayerBarChart";
import GaugeChart from "@/components/prayer/GaugeChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import CurrentStreakSvg from "./CurrentStreakSvg";
import LongestStreakSvg from "./LongestStreakSvg";

const TrackAdvancement = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const [date, setDate] = useState<Date | undefined>(new Date());

  const progressData = [
    { value: 60, status: "prayed" as const },
    { value: 20, status: "not-prayed" as const },
    { value: 20, status: "late" as const },
  ];

  const stats = {
    prayed: 3,
    late: 1,
    notPrayed: 1,
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="mt-14"
    >
      <div className="flex flex-col gap-6">
        <motion.h1
          variants={itemVariants}
          className="text-5xl lg:text-10xl leading-none font-urbanist font-normal text-[#9E66B4]"
        >
          Track Your Advancements
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-md md:text-xl text-neutral-600 dark:text-neutral-300"
        >
          Our automatic color-coding system allows you to easily monitor your
          Salah habits, with green representing on-time prayers, red
          representing missed prayers, and gray indicating delayed prayers. Stay
          motivated with real-time insights into your current and longest
          streaks, as well as detailed daily and monthly prayer patterns
          visualized via interactive graphs. You can also track your growth by
          sorting each prayer by date, which will help you maintain a consistent
          Salah routine.
        </motion.p>
      </div>
      <motion.div variants={itemVariants} className="mt-10">
        <div className="container mx-auto p-4 space-y-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Prayer Dashboard
          </h1>

          <div className="flex items-stretch w-full gap-8">
            <div className="flex-shrink-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl px-5 py-4 border bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex flex-grow gap-8">
              <StreakCard
                streak={7}
                title="Current Streak"
                accentColor="text-orange-500"
                elementsBgColor="bg-orange-500/10"
                svg={<CurrentStreakSvg />}
                backgroundColor="bg-white dark:bg-gray-800"
                textColor="text-gray-800 dark:text-gray-100"
                className="flex-grow"
              />
              <StreakCard
                streak={14}
                title="Longest Streak"
                accentColor="text-blue-500"
                elementsBgColor="bg-blue-500/10"
                svg={<LongestStreakSvg />}
                backgroundColor="bg-white dark:bg-gray-800"
                textColor="text-gray-800 dark:text-gray-100"
                className="flex-grow"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PrayerDayStatus />

            <PrayerBarChart
              items={progressData}
              showLabels={true}
              barWidth={60}
              barHeight={240}
              className="w-full"
            />

            <GaugeChart
              stats={stats}
              className="w-full"
              title="Daily Prayer Statistics"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrackAdvancement;
