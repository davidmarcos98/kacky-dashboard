'use client';
import dynamic from 'next/dynamic'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import parse from 'html-react-parser';


const Leaderboard = dynamic(() => import('@/components/leaderboard'), { ssr: false });


export default function MapPage() {
  let lb = require('./data.json')
  console.log(lb)
  
  return (
    /* TODO add link to kacky.gg */
    /* TODO add href to players' pages in kacky.gg as no way to link to db users */
    <section className="flex flex-col items-center justify-center gap-8 h-full">
      <h2 className="text-center text-gray-900 text-3xl font-extrabold md:text-5xl lg:text-6xl pt-8">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400">
          Leaderboard
        </span>
      </h2>
      <Leaderboard data={lb}/>
    </section>
  );
}
