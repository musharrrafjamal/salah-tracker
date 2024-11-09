"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavList = () => {
  const pathname = usePathname();
  const list = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Community", href: "/community" },
  ];

  return (
    <nav className="bg-orange-200 dark:bg-transparent px-2 py-1.5 rounded-full flex items-center gap-4 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-orange-200 dark:border-neutral-600 dark:border-2">
      {list.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
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
                transition={{ type: "spring", stiffness: 580, damping: 35 }}
              />
            )}
            <span className="relative z-10 font-medium">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavList;
