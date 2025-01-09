import { db } from '@/db/client';
import { randomMapsTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {Progress} from "@nextui-org/progress";
import PlayerTable from "@/components/playerTable";
import PlayerHeader from "@/components/playerHeader";
import PlayerTabs from '@/components/playersTabs';

export default async function Home() {  
  let data = await db.query.randomMapsTable.findMany({
    orderBy: [asc(randomMapsTable.id)]
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
