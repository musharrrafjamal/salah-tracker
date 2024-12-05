import { useState } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { HeartIcon, MessageCircleIcon } from "lucide-react";

interface CommentProps {
  id: number;
  user: string;
  content: string;
  likes: number;
  timestamp: string;
  replies?: CommentProps[];
}

export function HadithComment({
  comment,
  depth = 0,
}: {
  comment: CommentProps;
  depth?: number;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleLike = () => setIsLiked(!isLiked);

  const handleReply = () => {
    // Here you would typically send the reply to your backend
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
}
