"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quotes = [
  "The five daily prayers erase the sins which have been committed during the day. - Prophet Muhammad (PBUH)",
  "Prayer is the pillar of religion. - Prophet Muhammad (PBUH)",
  "Salah is the key to Paradise. - Prophet Muhammad (PBUH)",
  "The coolness of my eyes is in prayer. - Prophet Muhammad (PBUH)",
  "Prayer is a shield. - Prophet Muhammad (PBUH)",
];

export function InspirationQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-2xl p-6 shadow-lg w-full max-h-full"
    >
      <h2 className="text-2xl font-bold mb-4">Inspiration</h2>
      <p className="text-lg italic">&ldquo;{quote}&rdquo;</p>
    </motion.div>
  );
}
