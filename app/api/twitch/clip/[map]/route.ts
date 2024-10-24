import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq } from "drizzle-orm";
import { mapsTable } from "@/db/schema";
import { db } from "@/db/client";

export async function GET(req: NextRequest, { params }: { params: Promise<{ map: string }> }){
    /* 
        /addcom !clip $(customapi https://kacky.socr.am/api/twitch/clip/[MAP])
    */

    const map = await db.query.mapsTable.findFirst({
        where: eq(mapsTable.name, (await params).map as string),
        with: {
            finishes: {
                columns: {
                    clip: true,
                    id: true
                },
                limit: 1,
            }
        }
    });

    if (!map || !(map.finishes.length > 0)) {
        return new NextResponse(`No clip found for map ${(await params).map}`);
    }
    return new NextResponse(`Clip for #${(await params).map}: ${map.finishes.at(-1)?.clip}`);

}
