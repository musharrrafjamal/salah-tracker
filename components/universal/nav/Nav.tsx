"use client";
import React, { useEffect } from "react";
import NavList from "./NavList";
import NavActions from "./NavActions";
import Link from "next/link";
import Logo from "@/components/Logo";
import { motion, useAnimate, stagger } from "framer-motion";

const Nav = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [scope.current, { opacity: [0, 1] }, { duration: 0.5 }],
      [
        "div",
        { y: [20, 0], opacity: [0, 1] },
        { duration: 0.5, delay: stagger(0.1) },
      ],
      [
        ".logo-text",
        { scale: [0.9, 1], opacity: [0, 1] },
        { duration: 0.3, delay: stagger(0.1) },
      ],
    ]);
  }, [animate]);
  return (
    <motion.div
      ref={scope}
      className="flex justify-between items-center py-6"
      initial={{ opacity: 0 }}
    >
      <Link href={`/`} className="flex items-center gap-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Logo className="text-primary-base dark:text-neutral-300 w-5 lg:w-8" />
        </motion.div>
        <div className="text-lg lg:text-2xl flex items-center gap-0.5 text-primary-base dark:text-neutral-300 font-light">
          <motion.div className="font-semibold logo-text">Salah</motion.div>
          <motion.div className="logo-text">Tracker</motion.div>
        </div>
      </Link>
      <motion.div
        className="hidden lg:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <NavList />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <NavActions />
      </motion.div>
    </motion.div>
  );
};

export default Nav;
