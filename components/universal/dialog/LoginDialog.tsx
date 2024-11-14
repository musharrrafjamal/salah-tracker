"use client";
import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/types";
import {
  handleChangeLoginDialog,
  closeLoginDialog,
} from "@/redux/slices/loginDialog";

const LoginDialog = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.loginDialog.isOpen
  );

  const handleOpenChange = (open: boolean) => {
    dispatch(handleChangeLoginDialog(open));
  };

  // Example task that closes the modal after completion
  const handleLogin = () => {
    // Perform some task (e.g., form submission, API call)
    console.log("Logging in...");

    // Close the modal after the task
    dispatch(closeLoginDialog());
  };
  return (
    <ResponsiveModal open={isDialogOpen} onOpenChange={handleOpenChange}>
      <ResponsiveModalContent className="">
        <ResponsiveModalHeader>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-orange-500">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center dark:text-gray-400">
              Sign in to your account
            </CardDescription>
          </CardHeader>
        </ResponsiveModalHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-2 flex-col lg:flex-row items-center w-full">
              <Button
                variant="secondary"
                size="lg"
                className="w-full transition-all transform hover:bg-red-500 hover:text-white"
              >
                <FaGoogle className="w-5 h-5" />
                <span className="hidden lg:block">Google</span>
                <span className="block lg:hidden">Continue with Google</span>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full transition-all transform hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white"
              >
                <FaXTwitter className="w-5 h-5" />
                <span>Continue with X</span>
              </Button>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="w-full transition-all transform hover:bg-blue-500 hover:text-white"
            >
              <FaUserSecret className="w-5 h-5" />
              <span>Continue Anonymously</span>
            </Button>
          </div>

          <Separator className="my-4 dark:bg-gray-600" />

          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="dark:bg-black dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="dark:text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="•••••••••"
              className="dark:bg-black dark:text-white"
            />
          </div>
          <Button
            className="w-full dark:bg-orange-500 dark:text-white dark:hover:bg-orange-500/90"
            size={"lg"}
          >
            Sign In
          </Button>
          <Button variant="link" size="lg" className="w-full">
            Don&apos;t have an account? Sign Up
          </Button>
        </CardContent>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default LoginDialog;
