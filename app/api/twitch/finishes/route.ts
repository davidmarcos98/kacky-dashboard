import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { db } from "@/db/client";

export async function GET(req: NextRequest){
    /* 
        /addcom !fins $(customapi https://kacky.socr.am/api/twitch/finishes?user=[USER])
    */
    const params = req.nextUrl.searchParams;

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, params.get("user") as string),
        with: {
            finishes: {
                columns: {
                    clip: true,
                },
            }
        }
    });

    if (!user) {
        return NextResponse.json({ error: "No user with that name" }, { status: 401 });
    }

    return new NextResponse(`${params.get("user")} has finished ${user.finishes.length} maps`);
}
