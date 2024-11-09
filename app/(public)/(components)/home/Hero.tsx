"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ScanFace, Sparkles } from "lucide-react";
import AnimatedHeroIllustration from "./AnimatedHeroIllustration";
import { Button } from "@/components/shadcn/ui/button";

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-between mt-20 relative"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div
        className="-z-30 -bottom-24 dark:-bottom-64 dark:-left-24 -left-14 absolute blur-[80px] w-[36rem] h-[36rem] dark:w-[40rem] dark:h-[40rem] bg-gradient-to-tr from-[#FFD7CC] to-[#E7CCFF] dark:bg-gradient-to-tr dark:from-violet-900/50 dark:to-pink-900/50 rounded-full"
        variants={itemVariants}
      />
      <div className="relative w-full flex justify-center flex-col font-urbanist">
        <motion.div
          className="flex flex-col -space-y-2"
          variants={itemVariants}
        >
          <div className="text-[9rem] leading-none font-bold text-primary-base">
            Track
          </div>
          <div className="text-[9rem] leading-none font-bold text-blue-base">
            Reflect
          </div>
        </motion.div>
        <motion.div
          className="text-3xl leading-10 font-normal text-neutral-600 dark:text-neutral-300"
          variants={itemVariants}
        >
          Get Closer To Your Deen!
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 items-center mt-5"
        >
          <Button size={"lg"}>
            Get Started
            <Sparkles />
          </Button>
          <Button size={"lg"} variant={"outline"}>
            Login
            <ScanFace />
          </Button>
        </motion.div>
      </div>
      <motion.div className="w-full flex justify-end" variants={itemVariants}>
        <AnimatedHeroIllustration />
      </motion.div>
    </motion.div>
  );
};

export default Hero;