"use client";
import React, { useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
} from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Label } from "@/components/shadcn/ui/label";
import { Separator } from "@/components/shadcn/ui/separator";
import { FaGoogle, FaXTwitter, FaUserSecret } from "react-icons/fa6";
import { HadithComment } from "../hadith/HadithComment";

interface CommentProps {
  id: number;
  user: string;
  content: string;
  likes: number;
  timestamp: string;
  replies?: CommentProps[];
}

const CommentDialog = ({
  comments,
  open,
  setOpen,
}: {
  comments: CommentProps[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const handleOpenChange = () => {
    setOpen(!open);
  };

  return (
    <ResponsiveModal open={open} onOpenChange={handleOpenChange}>
      <ResponsiveModalContent size={"large"}>
        <ResponsiveModalHeader>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-orange-500">
              Comments
            </CardTitle>
            <CardDescription className="text-center dark:text-gray-400">
              Leave a comment
            </CardDescription>
          </CardHeader>
        </ResponsiveModalHeader>

        <CardContent className="space-y-4">
          {comments.map((comment) => (
            <HadithComment key={comment.id} comment={comment} />
          ))}
        </CardContent>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default CommentDialog;
