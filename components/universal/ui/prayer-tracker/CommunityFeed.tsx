"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";

interface FeedItem {
  id: number;
  user: string;
  avatar: string;
  action: string;
  time: string;
}

export function CommunityFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    // Simulating fetching community feed data
    const mockFeed: FeedItem[] = [
      {
        id: 1,
        user: "Ahmed",
        avatar: "/avatars/ahmed.jpg",
        action: "completed Fajr prayer",
        time: "5 minutes ago",
      },
      {
        id: 2,
        user: "Fatima",
        avatar: "/avatars/fatima.jpg",
        action: "achieved a 30-day streak",
        time: "1 hour ago",
      },
      {
        id: 3,
        user: "Omar",
        avatar: "/avatars/omar.jpg",
        action: "shared a Quranic verse",
        time: "2 hours ago",
      },
      {
        id: 4,
        user: "Aisha",
        avatar: "/avatars/aisha.jpg",
        action: "completed all prayers today",
        time: "3 hours ago",
      },
    ];
    setFeed(mockFeed);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-primary">Community Feed</h2>
      <AnimatePresence>
        {feed.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center space-x-4 mb-4"
          >
            <Avatar>
              <AvatarImage src={item.avatar} alt={item.user} />
              <AvatarFallback>{item.user[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-primary">
                {item.user} {item.action}
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
