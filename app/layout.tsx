import clsx from "clsx";

import "@/styles/globals.css";
import {Providers} from "./providers";
import Footer from "@/components/footer";
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic'
import '@fontsource-variable/raleway';
import SnippetComp from "@/components/snippet";

const Header = dynamic(() => import('@/components/navbar'), { ssr: true }) as any;

export default async function Document({ children }: { children: React.ReactNode }) {

  /* const players = await db.query.usersTable.findMany(); */
  const players = [
    {username: 'bren', twitch: 'bren_tm2'},
    {username: 'divinecarly', twitch: 'divinecarly'},
    {username: 'granady', twitch: 'granadyy'},
    {username: 'greep', twitch: 'greepthesheep'},
    {username: 'hefest', twitch: 'hefest'},
    {username: 'ingentea', twitch: 'ingentea'},
    {username: 'intax', twitch: 'intaxtm'},
    {username: 'jnic', twitch: 'jnic'},
    {username: 'jxliano', twitch: 'jxliano'},
    {username: 'Lars_tm', twitch: 'lars_tm'},
    {username: 'majijej', twitch: 'majijej'},
    {username: 'samifying', twitch: 'samifying'},
    {username: 'scrapie', twitch: 'scrapie'},
    {username: 'simplynick', twitch: 'simplynick'},
    {username: 'spammiej', twitch: 'spammiej'},
    {username: 'stealthjt', twitch: 'stealthjt_'},
    {username: 'tekky', twitch: 'tekky'},
    {username: 'wirtual', twitch: 'wirtual'},
  ]
  
  return (
    <html lang="en" className={`dark`}>
      <head>
        <script defer src="https://umami.socr.am/script.js" data-website-id="923640c3-4530-4e09-8e1f-dc43189fcbbd"></script>
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased flex flex-col font-body",
        )}
      >
        <Header isMobile={isMobile} players={players} />
        <Providers>
            {children}
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
