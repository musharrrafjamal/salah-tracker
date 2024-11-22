"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartIcon,
  ShareIcon,
  MessageSquareIcon,
  BookmarkIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

export default function HadithCard() {
  const [showArabic, setShowArabic] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    pressed: { scale: 0.95 },
  };

  const handleLike = () => setIsLiked(!isLiked);
  const handleSave = () => setIsSaved(!isSaved);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=JD" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">Posted 2 hours ago</p>
          </div>
        </div>

        <div className="mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={showArabic ? "arabic" : "english"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              transition={{ duration: 0.3 }}
            >
              {showArabic ? (
                <p
                  className="text-2xl text-right font-arabic mb-2"
                  style={{ direction: "rtl" }}
                >
                  خَيْرُكُمْ أَحْسَنُكُمْ خُلُقًا
                </p>
              ) : (
                <p className="text-2xl font-semibold mb-2">
                  The best among you are those who have the best manners and
                  character.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowArabic(!showArabic)}
            className="mt-2"
          >
            {showArabic ? "Show English" : "Show Arabic"}
          </Button>
        </div>

        <div className="space-y-2 mb-6 text-sm text-gray-600">
          <p>
            <strong>Reference:</strong> Sahih al-Bukhari, Hadith 6035
          </p>
          <p>
            <strong>Narrator:</strong> Abdullah ibn Amr ibn al-As (may Allah be
            pleased with him)
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">Explanation</h3>
          <p className="text-sm text-gray-600 mb-4">
            This Hadith emphasizes the importance of good character in Islam. It
            teaches that a person's worth is measured by their behavior and
            treatment of others, not by wealth, status, or appearance.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                  >
                    <Button variant="ghost" size="sm" onClick={handleLike}>
                      <HeartIcon
                        className={`w-5 h-5 ${
                          isLiked
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="ml-2">1.2K</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLiked ? "Unlike" : "Like"} this Hadith</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                  >
                    <Button variant="ghost" size="sm">
                      <ShareIcon className="w-5 h-5 text-gray-500" />
                      <span className="ml-2">Share</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this Hadith</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                  >
                    <Button variant="ghost" size="sm">
                      <MessageSquareIcon className="w-5 h-5 text-gray-500" />
                      <span className="ml-2">245</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View comments</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="pressed"
                >
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <BookmarkIcon
                      className={`w-5 h-5 ${
                        isSaved
                          ? "fill-blue-500 text-blue-500"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="ml-2">Save</span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isSaved ? "Remove from" : "Save to"} collection</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
