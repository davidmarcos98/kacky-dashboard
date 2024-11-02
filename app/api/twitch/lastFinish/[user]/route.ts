import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq, desc } from "drizzle-orm";
import { finishesTable, usersTable } from "@/db/schema";
import { db } from "@/db/client";

function titleCase(word: string) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ user: string }> }){
    /* 
        /addcom !lastfin $(customapi https://kacky.socr.am/api/twitch/lastFinish/[USER])
    */

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, (await params).user as string),
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
                orderBy: [desc(finishesTable.id)],
            }
        }
    });

    if (!user) {
        return NextResponse.json({ error: "No user with that name" }, { status: 401 });
    }

    if (!(user.finishes.length > 0)) {
        return new NextResponse(`${titleCase((await params).user)} has not finished any map yet Sadge`);
    }

    return new NextResponse(`Last finish - map #${user.finishes.at(-1)?.map.name}: ${user.finishes.at(-1)?.clip} |  | https://kacky.socr.am/dashboard/maps/${user.username}`);
}
