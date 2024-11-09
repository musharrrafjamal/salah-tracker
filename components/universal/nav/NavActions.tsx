"use client";
import React from "react";
import ThemeToggle from "../ui/ThemeToggle";
import ResponsiveNavList from "./ResponsiveNavList";
import { Button } from "@/components/shadcn/ui/button";
import { ScanFace } from "lucide-react";
import { useDispatch } from "react-redux";
import { openLoginDialog } from "@/redux/slices/loginDialog";

const NavActions = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 items-center">
      <div className="hidden lg:block">
        <ThemeToggle />
      </div>
      <div className="block lg:hidden">
        <ResponsiveNavList />
      </div>
      <Button onClick={() => dispatch(openLoginDialog())}>
        <ScanFace />
        Login
      </Button>
    </div>
  );
};

export default NavActions;
