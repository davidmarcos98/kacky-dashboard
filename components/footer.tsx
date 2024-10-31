"use client"
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    return (
        <footer className="flex fixed bottom-0 z-40 h-10 w-full bg-black justify-end items-center pl-4 pr-4" style={{ bottom: 0}}>
            {pathname === "/leaderboard" ? (
                <span>Data from kacky.gg</span>
            ) : (<></>)}
            <span>Made by @socramdavid</span>
        </footer>
  );
}