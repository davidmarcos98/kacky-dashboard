"use client"
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    return (
        <footer className={`flex fixed bottom-0 z-40 h-10 w-full bg-black ${pathname === "/leaderboard" ? 'justify-between' : 'justify-end'} items-center pl-4 pr-4`} style={{ bottom: 0}}>
            {pathname === "/leaderboard" ? (
                <span>Data from <a href='https://kacky.gg' className="underline" target="_blank">kacky.gg</a></span>
            ) : (<></>)}
            <span>Made by @socramdavid</span>
        </footer>
  );
}