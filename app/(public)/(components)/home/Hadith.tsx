"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useAnimation,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
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
import { Textarea } from "@/components/shadcn/ui/textarea";
import {
  HeartIcon,
  ShareIcon,
  MessageSquareIcon,
  BookmarkIcon,
  MessageCircleIcon,
} from "lucide-react";
import CommentDialog from "@/components/universal/dialog/CommentDialog";

interface CommentProps {
  id: number;
  user: string;
  content: string;
  likes: number;
  timestamp: string;
  replies?: CommentProps[];
}

const CombinedHadithExperience = () => {
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

  const [showArabic, setShowArabic] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [openCommentDialog, setOpenCommentDialog] = useState(false);

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

  const comments: CommentProps[] = [
    {
      id: 1,
      user: "Aisha",
      content:
        "This hadith reminds us of the importance of good character in our daily lives.",
      likes: 15,
      timestamp: "2 hours ago",
      replies: [
        {
          id: 2,
          user: "Omar",
          content:
            "It's a great reminder to always strive for excellence in our conduct.",
          likes: 8,
          timestamp: "1 hour ago",
        },
      ],
    },
    {
      id: 3,
      user: "Fatima",
      content:
        "I try to reflect on this hadith every day. It helps me to be more mindful of my actions.",
      likes: 10,
      timestamp: "3 hours ago",
    },
  ];

  const HadithComment = ({
    comment,
    depth = 0,
  }: {
    comment: CommentProps;
    depth?: number;
  }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const handleLike = () => setIsLiked(!isLiked);

    const handleReply = () => {
      console.log("Reply submitted:", replyContent);
      setReplyContent("");
      setShowReplyForm(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: depth * 0.1 }}
        className={`p-4 ${depth > 0 ? "ml-6 border-l" : ""}`}
      >
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user}`}
            />
            <AvatarFallback>{comment.user[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{comment.user}</h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {comment.timestamp}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {comment.content}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="text-xs"
              >
                <HeartIcon
                  className={`w-4 h-4 mr-1 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {comment.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-xs"
              >
                <MessageCircleIcon className="w-4 h-4 mr-1" />
                Reply
              </Button>
            </div>
            {showReplyForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2"
              >
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="mb-2"
                />
                <Button onClick={handleReply} size="sm">
                  Submit Reply
                </Button>
              </motion.div>
            )}
          </div>
        </div>
        {comment.replies &&
          comment.replies.map((reply) => (
            <HadithComment key={reply.id} comment={reply} depth={depth + 1} />
          ))}
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="mt-4 flex flex-col gap-10"
    >
      <motion.h1
        style={{ opacity, scale }}
        className="text-5xl lg:text-10xl leading-none font-urbanist font-normal text-amber-500"
      >
        Post & Hadith
      </motion.h1>
      <motion.div variants={itemVariants} className="w-full">
        <Card className="w-full mx-auto bg-white p-6">
          <CardContent className="p-0">
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
                <strong>Narrator:</strong> Abdullah ibn Amr ibn al-As (may Allah
                be pleased with him)
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">Explanation</h3>
              <p className="text-sm text-gray-600 mb-4">
                This Hadith emphasizes the importance of good character in
                Islam. It teaches that a person's worth is measured by their
                behavior and treatment of others, not by wealth, status, or
                appearance.
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setOpenCommentDialog(true)}
                        >
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
      </motion.div>
      <CommentDialog
        comments={comments}
        open={openCommentDialog}
        setOpen={setOpenCommentDialog}
      />
    </motion.div>
  );
};

export default CombinedHadithExperience;
