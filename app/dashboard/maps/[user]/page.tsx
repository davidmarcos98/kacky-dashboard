import dynamic from 'next/dynamic'

import { db } from '@/db/client';
import { usersTable } from "@/db/schema";
import { eq } from 'drizzle-orm';

const Dashboard = dynamic(() => import('@/components/dashboard'), { ssr: true }) as any;

export default async function MapsPage({ params }: { params: { user: string } }) {
  
  let mapsData = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, params.user.toLowerCase() as string),
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

  if (!mapsData) {
      return (
          <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10">
              <h1 className="text-3xl font-bold">No user with that name</h1>
              <h1 className="text-xl font-bold">Please contact @socramdavid in discord to get you setup.</h1>
          </section>
      )
  }
  let maps = mapsData?.finishes

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
