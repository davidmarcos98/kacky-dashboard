import clsx from "clsx";

import "@/styles/globals.css";
import {Providers} from "./providers";
import Footer from "@/components/footer";
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic'
import {db} from "@/db/client";

const Header = dynamic(() => import('@/components/navbar'), { ssr: false }) as any;
const SnippetComp = dynamic(() => import('@/components/snippet'), { ssr: false }) as any;

export default async function Document({ children }: { children: React.ReactNode }) {

  const players = await db.query.usersTable.findMany();
  
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <script defer src="https://umami.socr.am/script.js" data-website-id="923640c3-4530-4e09-8e1f-dc43189fcbbd"></script>
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
        )}
      >
        <Header isMobile={isMobile} players={players} />
        <SnippetComp isMobile={isMobile}/>
        <Providers>
            {children}
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
