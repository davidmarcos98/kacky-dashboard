'use client'
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import {Providers} from "./providers";
import Header from "../components/navbar"
import Footer from "@/components/footer";

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
        <Footer/>
      </body>
    </html>
  );
}
