// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { db } from "../../../../db/client";
import { randomMapsTable } from "../../../../db/schema";
import { asc } from 'drizzle-orm';

export async function GET(req: NextRequest, { params }: { params: Promise<{ user: string }> }){
    /* 
        /addcom !fins $(customapi https://kacky.socr.am/api/twitch/finishes/[USER])
    */

    const data = await db.query.randomMapsTable.findMany({
        orderBy: [asc(randomMapsTable.datetime)],
    });

    return NextResponse.json(data)
}

export const revalidate = 0;
