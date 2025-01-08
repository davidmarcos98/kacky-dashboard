// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { db } from "../../../../db/client";

export async function GET(req: NextRequest, { params }: { params: Promise<{ user: string }> }){
    /* 
        /addcom !fins $(customapi https://kacky.socr.am/api/twitch/finishes/[USER])
    */

    const data = await db.query.randomMapsTable.findMany({});

    let scrapie = (data.filter(item => item.player == "Scrapie98").at(-1))
    let lars = (data.filter(item => item.player == "Larstm").at(-1))

    return new NextResponse(`${scrapie ? `Scrapie has ${scrapie.currentMedalCount} ATs/${Math.max(scrapie.currentGoldCount || -1, 0)} golds` : 'Scrapie has not finished any map yet Sadge'} | ${lars ? `Lars has ${lars.currentMedalCount} ATs/${Math.max(lars.currentGoldCount || -1, 0)} golds` : 'Lars has not finished any map yet Sadge'}`);
}