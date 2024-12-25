"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PrayerBarChart } from "@/components/prayer/PrayerBarChart";
import GaugeChart from "@/components/prayer/gauge-chart/GaugeChart";

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

  const stats = {
    prayed: 2,
    late: 1,
    notPrayed: 2,
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="mt-10"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <PrayerBarChart />

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
