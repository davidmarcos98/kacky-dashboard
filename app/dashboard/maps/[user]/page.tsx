import dynamic from 'next/dynamic'

import { db } from '@/db/client';
import { usersTable } from "@/db/schema";
import { eq } from 'drizzle-orm';

const Dashboard = dynamic(() => import('@/components/dashboard'), { ssr: false }) as any;

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
