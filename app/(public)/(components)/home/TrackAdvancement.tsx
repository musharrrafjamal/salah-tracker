"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PrayerTracker } from "@/components/universal/ui/prayer-tracker/PrayerTracker";

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
          className="text-10xl leading-none font-urbanist font-normal text-[#9E66B4]"
        >
          Track Your Advancements
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-neutral-600 dark:text-neutral-300"
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
        <PrayerTracker />
      </motion.div>
    </motion.div>
  );
};

export default TrackAdvancement;
