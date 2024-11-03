import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq, and } from "drizzle-orm";
import { finishesTable, mapsTable, usersTable } from "@/db/schema";
import { db } from "@/db/client";
import {today, getLocalTimeZone} from "@internationalized/date";


export async function GET(req: NextRequest){
    /* 
        !addcom !lastfin $(customapi https://kacky.socr.am/api/twitch/addFinish?map=$(1)&clip=$(2))
    */

    const headers = req.headers;
    const searchParams = req.nextUrl.searchParams;

    let nightbotUser = headers.get('nightbot-channel')
    let fossaUser = headers.get('x-fossabot-channeldisplayname')
    let username = ''

    if (nightbotUser) {
        username = nightbotUser.split('&')[0].split('=')[1]
    } else {
        username = fossaUser?.toLocaleLowerCase() as string
    }

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.twitch, username),
    });
    const map = await db.query.mapsTable.findFirst({
        where: eq(mapsTable.name, searchParams.get("map") as string),
    });

    if (!user || !map) {
        return NextResponse.json({ error: "User or map not found" }, { status: 401 });
    }
    
    if (!nightbotUser && fossaUser){
        const validateFossa = await fetch(headers.get('x-fossabot-validateurl') as string)
        
        if (validateFossa.status != 200) {
            return NextResponse.json({ error: "Could not validate fossabot token" }, { status: 401 });
        }
    }

    const finish = await db.query.finishesTable.findFirst({
        where: and(eq(finishesTable.mapId, map.id), eq(finishesTable.userId, user.id)),
    })

    if (finish) {
        return new NextResponse(`Clip for user and map name already found`);
    }

    const date = today(getLocalTimeZone())
    
    // Insert new finish
    await db.insert(finishesTable).values({
        userId: user?.id,
        mapId: map?.id,
        clip: searchParams.get("clip") as string,
        date: `${date?.year}-${date?.month}-${date?.day}` as string
    });

    return new NextResponse(`Added new clip for ${username} on map ${map?.name}`);
}
