import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { db } from "@/db/client";

function titleCase(word: string) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}


export async function GET(req: NextRequest, { params }: { params: Promise<{ user: string }> }){
    /* 
    /addcom !fins $(customapi https://kacky.socr.am/api/twitch/finishes/[USER])
    */
    let maps = [...Array(75)].map((_, i) => 301 + i * 1);
    const searchParams = req.nextUrl.searchParams;

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, (await params).user as string),
        with: {
            finishes: {
                with: {
                    map: true
                },
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
        return new NextResponse(`${titleCase((await params).user)} has not finished any map yet Sadge`);
    }
    
    for (let fin of user.finishes) {
        maps.splice(maps.indexOf(parseInt(fin.map.name)), 1);
    }

    if (searchParams.get('raw')) {
        return new NextResponse(`${maps.join(", ")}`);
    }
    return new NextResponse(`Maps left: ${maps.join(", ")}`);
}
