// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import 'dotenv/config';
import * as schema from "../../app/db/schema";
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from "drizzle-orm";
import { mapsTable, usersTable, finishesTable } from "../../app/db/schema";
import { Pool } from "pg";

type Map = {
    id: number
    name: string;
    author: string;
    finished?: boolean; // finished will be true if anyone finished when returning all maps
    clip?: string;
    clips?: string[]; // clips is returned instead of clip if it's main view
    thumbnail: string; // probably can be built from map name?
};

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse<any[]>,
) {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      
    const db = await drizzle(pool, {schema});
    /* let map = 300;
    while (map < 376) {
        await db.insert(mapsTable).values({name: map, thumbnail: `https://static.kacky.gg/kk/thumbs/${map-100}.jpg`})
        map++;
    } */

    let maps;
    if (req.query.user) {
        maps = await db.query.usersTable.findMany({
            where: eq(usersTable.username, req.query.user as string),
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
    res.status(200).json(maps);
}
