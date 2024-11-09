import type { Metadata } from "next";
import { Poppins, Urbanist, ZCOOL_XiaoWei } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";
import ReduxProvider from "@/provider/ReduxProvider";
import LoginDialog from "@/components/universal/dialog/LoginDialog";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const urbanist = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Salah Tracker",
  description: "A tool for tracking Salah and many more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${urbanist.variable} antialiased dark:bg-neutral-950`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoginDialog />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
