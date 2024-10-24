import dynamic from 'next/dynamic'

import { db } from '@/db/client';
import { usersTable } from "@/db/schema";
import { eq } from 'drizzle-orm';
import { tv } from "tailwind-variants";

const Dashboard = dynamic(() => import('@/components/dashboard'), { ssr: false }) as any;
const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export default async function MapsPage({ params }: { params: { user: string } }) {
  
  let mapsData = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, params.user as string),
      with: {
          finishes: {
              columns: {
                  clip: true,
              },
              with: {
                  map: {
                      columns: {
                          name: true,
                          thumbnail: true,
                          author: true
                      }
                  },
              }
          }
      }
  });
  let maps = mapsData?.finishes
  
  //let maps = await db.query.mapsTable.findMany({});
  
  return (
      <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10">
        <div className="inline-block text-center justify-center max-w-[100vw]">
          {/* <h1 className={title()}>Maps {params.user ? ` finished by ${params.user}` : ""}</h1> */}
          <div className="flex flex-wrap inline gap-4 justify-center">
            <Dashboard maps={maps} user={params.user}/>
          </div>
        </div>
      </section>
  );
}
