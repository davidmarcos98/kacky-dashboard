"use client"
import {Link} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    return (
        <footer className="flex fixed bottom-0 z-40 h-10 w-full bg-black justify-between items-center pl-4 pr-4">
            {pathname === "/leaderboard" ? (
                <span>Data from kacky.gg</span>
            ) : (
                <Link href="https://discordapp.com/users/298826431889145857" target="_blank" className="text-white underline font-bold">Contact me to get your page</Link>
            )}
            <span>Made by @socramdavid</span>
        </footer>
  );
}