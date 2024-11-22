"use client";

import React, { useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HadithCard from "@/components/universal/hadith/HadithCard";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { BookOpenIcon, BrainIcon, UsersIcon, Sparkles } from "lucide-react";

const Hadith = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

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
        staggerChildren: 0.2,
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
      className="mt-14 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
    >
      <motion.h1
        style={{ opacity, scale }}
        className="text-5xl md:text-7xl lg:text-9xl leading-none font-urbanist font-bold text-amber-500 mb-12 text-center"
      >
        Hadith of the Day
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <HadithCard />
        </motion.div>
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-amber-600 dark:text-amber-300 flex items-center">
                  <Sparkles className="mr-2" />
                  Explore More
                </h2>
                <div className="space-y-4">
                  {[
                    { text: "Related Hadiths", icon: BookOpenIcon },
                    { text: "Community Discussions", icon: UsersIcon },
                    { text: "Reflect & Learn", icon: BrainIcon },
                  ].map(({ text, icon: Icon }) => (
                    <motion.div
                      key={text}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-amber-700 transition-colors duration-200"
                        size="lg"
                      >
                        <Icon className="mr-2 h-5 w-5" />
                        {text}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-300 flex items-center">
                  <Sparkles className="mr-2" />
                  Daily Wisdom
                </h2>
                <p className="text-gray-700 dark:text-gray-200 italic">
                  "The best way to find yourself is to lose yourself in the
                  service of others."
                </p>
                <p className="text-right text-gray-600 dark:text-gray-300 mt-2">
                  - Mahatma Gandhi
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-300 flex items-center">
                  <Sparkles className="mr-2" />
                  Did You Know?
                </h2>
                <p className="text-gray-700 dark:text-gray-200">
                  The word "Hadith" means "narrative" or "report" in Arabic. It
                  refers to the collected sayings and actions of Prophet
                  Muhammad (peace be upon him).
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hadith;
