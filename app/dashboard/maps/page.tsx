import { db } from '@/db/client';
import { Dashboard } from "@/components/dashboard";
import { mapsTable } from "@/db/schema";
import { asc } from "drizzle-orm";

export default async function MapsPage({ params }: { params: { user: string } }) {
  
  let mapsData = await db.query.mapsTable.findMany({
    orderBy: [asc(mapsTable.id)]
  });
  let maps = mapsData;
  
  return (
      <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-67">
        <div className="inline-block text-center justify-center max-w-[100vw]">
          <h2 className="text-center text-gray-900 text-3xl font-extrabold md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400">Maps {params.user ? ` finished by ${params.user}` : ""}</span>
          </h2>
          <div className="flex flex-wrap inline gap-4 justify-center pt-6">
            <Dashboard maps={maps} all/>
          </div>
        </div>
      </section>
  );
}
