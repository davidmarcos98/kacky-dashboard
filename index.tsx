import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Map, MapCard } from "@/components/mapCard"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function MapsPage() {
  const params = useSearchParams();
  const [maps, setMaps] = useState<Map[]>([]);

  useEffect(() => {
    const user = params.get('user');
    setTimeout(() => {
      fetch(user ? `/api/maps?user=${user}` : '/api/maps')
        .then(data => data.json())
        .then(data => {
          let retrievedMaps = [];
          if (user) {
            if (data.length > 0) {
              for (let finish of data[0].finishes) {
                retrievedMaps.push({
                  ...finish.map,
                  clip: finish.clip
                });
              }
            }
          } else {
            retrievedMaps = [...data];
          }
  
          setMaps(retrievedMaps);
        });
    }, 300)
  }, [params])

  // TODO: make route variable per user
  
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10">
        <div className="inline-block text-center justify-center max-w-[100vw]">
          <h1 className={title()}>Maps {params.get('user') ? ` finished by ${params.get('user')}` : ""}</h1>
          <div className="flex flex-wrap inline gap-4 justify-center pt-6">
            {maps.map(map => (
              <MapCard key={map.name} map={map}/>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
