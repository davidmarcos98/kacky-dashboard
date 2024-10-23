'use client'
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import {Providers} from "./providers";
import Header from "../components/navbar"
import { Link } from "@nextui-org/react";

export default function Document({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className="dark">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable,
        )}
      >
        <Header/>
        <Providers>
            {children}
        </Providers>
        <footer className="flex fixed bottom-0 z-50 h-10 w-full bg-black justify-between items-center pl-4 pr-4">
          {window.location.pathname === "/leaderboard" && (
            <span>Data from kacky.gg</span>
          )}
          <Link href="https://discordapp.com/users/298826431889145857" className="text-white underline font-bold">Contact me</Link>
        </footer>
      </body>
    </html>
  );
}
