"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/shadcn/ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTrigger,
} from "@/components/shadcn/ui/dialog";
import { Menu } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Community", href: "/community" },
];

const ResponsiveNavList = () => {
  const pathname = usePathname();

  const NavLinks = ({ onClick = () => {} }) => (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`relative px-4 py-2 rounded-full text-sm font-normal transition-colors duration-300 ${
              isActive
                ? "text-white"
                : "text-gray-700 dark:text-neutral-200 hover:dark:text-primary-light hover:text-gray-900"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 bg-primary-base rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 font-medium">{item.title}</span>
          </Link>
        );
      })}
    </>
  );
  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Menu />
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side={"right"}>
        <ResponsiveModalHeader>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center dark:text-white flex gap-1">
              <Logo className="text-primary-base dark:text-neutral-300 w-5 lg:w-8" />
              <div className="text-lg lg:text-2xl flex items-center gap-0.5 text-primary-base dark:text-neutral-300 font-light">
                <div className="font-semibold">Salah</div> Tracker
              </div>
            </CardTitle>
          </CardHeader>
        </ResponsiveModalHeader>

        <CardContent className="space-y-4">
          <nav className="flex flex-col items-start gap-4 mt-8">
            <NavLinks onClick={() => document.body.click()} />
          </nav>
        </CardContent>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ResponsiveNavList;
