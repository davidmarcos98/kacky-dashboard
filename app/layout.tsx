'use client'
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import {Providers} from "./providers";
import Footer from "@/components/footer";
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/navbar'), { ssr: false }) as any;


export default function Document({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className="dark">
      <head>
        <script defer src="https://umami.socr.am/script.js" data-website-id="923640c3-4530-4e09-8e1f-dc43189fcbbd"></script>
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable,
        )}
      >
        <Header isMobile={isMobile}/>
        <Providers>
            {children}
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
