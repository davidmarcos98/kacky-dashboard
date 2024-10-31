// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from "drizzle-orm";
import { mapsTable, usersTable, finishesTable } from "../../../db/schema";
import { db } from "../../../db/client";

type Map = {
    id: number
    name: string;
    author: string;
    finished?: boolean; // finished will be true if anyone finished when returning all maps
    clip?: string;
    clips?: string[]; // clips is returned instead of clip if it's main view
    thumbnail: string; // probably can be built from map name?
};

export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams
    /* let map = 300;
    while (map < 376) {
        await db.insert(mapsTable).values({name: map, thumbnail: `https://static.kacky.gg/kk/thumbs/${map-100}.jpg`})
        map++;
    } */
  
    let maps;
    if (searchParams.get("user")) {
        maps = await db.query.usersTable.findMany({
            where: eq(usersTable.username, searchParams.get("user") as string),
            with: {
                finishes: {
                    columns: {
                        clip: true,
                    },
                    with: {
                        map: {
                            columns: {
                                name: true,
                                thumbnail: true,
                                author: true
                            }
                        },
                    }
                }
            }
        });
    } else {
        maps = await db.query.mapsTable.findMany({});
    }
    return NextResponse.json(maps)
}
