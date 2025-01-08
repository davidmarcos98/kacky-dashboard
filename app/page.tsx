import { db } from '@/db/client';
import { randomMapsTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {Progress} from "@nextui-org/progress";
import PlayerTable from "@/components/playerTable";

export default async function Home() {
  
  let data = await db.query.randomMapsTable.findMany({
    orderBy: [asc(randomMapsTable.id)]
  });
  console.log(data)

  

  

  const playerCurrentCount = (player: string) => {
    return data.filter((item) => item.player === player).at(-1)?.currentMedalCount
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"> 
      <div>
        <Card>
          <CardHeader>
            <h4 className="text-xl font-bold">David - {playerCurrentCount("socramdavid98")} ATs</h4> 
          </CardHeader>
          <CardBody>
            <PlayerTable data={data} player="socramdavid98"/>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <h4 className="text-xl font-bold">Player 2</h4> 
          </CardHeader>
          <CardBody>
            {/* Player 2 stats and progress */}
          </CardBody>
        </Card>
      </div>
      <div className="col-span-2"> 
        <Card>
          <CardHeader>
            <h4 className="text-xl font-bold">Recent Activity</h4> 
          </CardHeader>
          <CardBody>
            {/* Display recent medal events */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
  
}

export const dynamic = "force-dynamic";
