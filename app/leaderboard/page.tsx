'use client';
import dynamic from 'next/dynamic'


const Leaderboard = dynamic(() => import('@/components/leaderboard'), { ssr: true }) as any;


export default function MapPage() {
  let lb = require('./data.json')
  
  return (
    /* TODO add link to kacky.gg */
    /* TODO add href to players' pages in kacky.gg as no way to link to db users */
    <section className="flex flex-col items-center justify-center gap-8 h-full">
      <Leaderboard data={lb}/>
    </section>
  );
}
