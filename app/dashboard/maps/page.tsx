import dynamic from 'next/dynamic'
import { db } from '@/db/client';
import { mapsTable } from "@/db/schema";
import { asc } from "drizzle-orm";

const Dashboard = dynamic(() => import('@/components/dashboard'), { ssr: false }) as any;
export default async function MapsPage() {
  
  let mapsData = await db.query.mapsTable.findMany({
    with: {
      finishes: true
    },
    orderBy: [asc(mapsTable.id)]
  });
  let maps = mapsData;

  return (
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="inline-block text-center justify-center max-w-[100vw]">
          <div className="flex flex-wrap inline gap-4 justify-center">
            <Dashboard maps={maps} all/>
          </div>
        </div>
      </section>
  );
}
