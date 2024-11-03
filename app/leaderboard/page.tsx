'use client';
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';


const Leaderboard = dynamic(() => import('@/components/leaderboard'), { ssr: true }) as any;


export default function MapPage() {
  let [lb, setLb] = useState<any>()

  useEffect(() => {
    fetch('https://kackyfiles.davidmarcos.dev/kr5_lb.json').then(data => {
      return data.json()
    }).then(data => {
      let newLb = []
      for (let item of Object.values(data)) {
        newLb.push({
          avg: (item as any)[4],
          fins: (item as any)[2],
          nick: (item as any)[1],
          index: (item as any)[0]
        })
      }
      setLb(newLb);
    })
  }, [])
  
  return (
    /* TODO add link to kacky.gg */
    /* TODO add href to players' pages in kacky.gg as no way to link to db users */
    <section className="flex flex-col items-center justify-center gap-8 h-full">
      <Leaderboard data={lb}/>
    </section>
  );
}
