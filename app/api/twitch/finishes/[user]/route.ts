import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { db } from "@/db/client";

export async function GET(req: NextRequest, { params }: { params: Promise<{ user: string }> }){
    /* 
        /addcom !fins $(customapi https://kacky.socr.am/api/twitch/finishes/[USER])
    */

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, (await params).user as string),
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

    if (!(user.finishes.length > 0)) {
        return new NextResponse(`${(await params).user} has not finished any map yet Sadge`);
    }

    return new NextResponse(`${(await params).user} has finished ${user.finishes.length} maps | https://kacky.socr.am/dashboard/maps/${user.username}`);
}
