import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq, desc } from "drizzle-orm";
import { finishesTable, mapsTable, usersTable } from "@/db/schema";
import { db } from "@/db/client";

export async function GET(req: NextRequest){
    /* 
        /addcom !lastfin $(customapi https://kacky.socr.am/api/twitch/lastFinish?user=[USER])
    */
    const params = req.nextUrl.searchParams;

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, params.get("user") as string),
        with: {
            finishes: {
                columns: {
                    clip: true,
                    id: true
                },
                with: {
                    map: {
                        columns: {
                            name: true
                        }
                    }
                },
                limit: 1,
                orderBy: [desc(finishesTable.date)],
            }
        }
    });

    if (!user) {
        return NextResponse.json({ error: "No user with that name" }, { status: 401 });
    }

    return new NextResponse(`Last finish - map #${user.finishes.at(-1)?.map.name}: ${user.finishes.at(-1)?.clip}`);
}
