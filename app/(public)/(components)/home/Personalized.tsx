"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PrayerTracker } from "@/components/universal/ui/prayer-tracker/PrayerTracker";

const Personalized = () => {
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
          className="text-5xl lg:text-10xl leading-none font-urbanist font-normal text-amber-500"
        >
          Personalized Salah Companion!
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-md md:text-xl text-neutral-600 dark:text-neutral-300"
        >
          Stay on track with your 5 daily prayers. With just a few taps, you can
          log your Salah, set reminders, and create custom goals like reading
          the Qur&apos;an. Plus, you can see your progress over time with
          easy-to-read insights. It&apos;s simple, personal, and made to support
          your spiritual journey every day.
        </motion.p>
      </div>
      <motion.div variants={itemVariants} className="mt-10">
        <PrayerTracker />
      </motion.div>
    </motion.div>
  );
};

export default Personalized;
