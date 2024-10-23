import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import {Providers} from "./providers";

export default function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
