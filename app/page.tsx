import { db } from '@/db/client';
import { randomMapsTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import PlayerTabs from '@/components/playersTabs';
import { ne } from "drizzle-orm";

export default async function Home() {  
  let data = await db.query.randomMapsTable.findMany({
    where: ne(randomMapsTable.skipType, "forceSwitch"),
    orderBy: [asc(randomMapsTable.datetime)]
  });

  return (
    <div>
      <div className='text-center my-16'>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <span className="underline underline-offset-3 decoration-8 decoration-green-400 dark:decoration-green-600">
            1000 AT
          &nbsp;Challenge²
          </span>
        </h1>
      </div>
      <PlayerTabs data={data}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mx-4 mb-16"> 
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
  
}

export const dynamic = "force-dynamic";
