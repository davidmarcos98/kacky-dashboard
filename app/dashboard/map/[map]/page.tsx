import { title } from "@/components/primitives";
import { db } from '@/db/client';
import { mapsTable, finishesTable } from "@/db/schema";
import { eq } from 'drizzle-orm';
import { MapView, Clip, Map } from "@/components/mapView";

export default async function MapPage({ params }: { params: { map: string } }) {
  let mapData = await db.query.mapsTable.findFirst({
    where: eq(mapsTable.name, params.map as string),
    with: {
        finishes: {
            columns: {
                clip: true,
                date: true,
            },
            with: {
                user: {
                    columns: {
                        username: true,
                    },
                }
            }
        }
    }
  });
  let clips: Clip[] = mapData?.finishes as Clip[];
  
  return (
      <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10">
        <MapView map={mapData as Map} clips={clips} mapPage={true}/>
      </section>
  );
}
