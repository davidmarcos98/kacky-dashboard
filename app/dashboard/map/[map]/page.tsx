import { db } from '@/db/client';
import { mapsTable } from "@/db/schema";
import { eq } from 'drizzle-orm';
import { Clip, Map } from "@/components/mapView";
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('@/components/mapView'), { ssr: false }) as any;

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
      <section className="flex flex-col items-center justify-center gap-4 py-3">
        <MapView map={mapData as Map} clips={clips} mapPage={true}/>
      </section>
  );
}
