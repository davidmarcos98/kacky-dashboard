import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq, and } from "drizzle-orm";
import { finishesTable, mapsTable, usersTable } from "@/db/schema";
import { db } from "@/db/client";

export async function GET(req: NextRequest, { params }: { params: Promise<{ map: string }> }){
    /* 
        /addcom !clip $(customapi https://kacky.socr.am/api/twitch/clip/[MAP])
    */
    const headers = req.headers;
    let fossaUser = headers.get('x-fossabot-channeldisplayname')
    let map;
    let user;

    if (fossaUser) {
        user = await db.query.usersTable.findFirst({
            where: eq(usersTable.twitch, fossaUser.toLowerCase()),
        });
    }
    map = await db.query.mapsTable.findFirst({
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
    if (map && user) {
        const finish = await db.query.finishesTable.findFirst({
            where: and(eq(finishesTable.mapId, map.id), eq(finishesTable.userId, user.id)),
        })
        if (finish) {
            return new NextResponse(`Clip for #${(await params).map}: ${finish?.clip}`);
        }
    }

    if (!map || !(map.finishes.length > 0)) {
        return new NextResponse(`No clip found for map ${(await params).map}`);
    }
    return new NextResponse(`Clip for #${(await params).map}: ${map.finishes.at(-1)?.clip}`);

}
