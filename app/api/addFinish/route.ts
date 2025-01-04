// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq, and } from "drizzle-orm";
import { usersTable, finishesTable, mapsTable } from "../../../db/schema";
import { db } from "../../../db/client";
import {today, getLocalTimeZone} from "@internationalized/date";

export async function POST(req: NextRequest){
    const body = await req.json();

    if (body.password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "no" }, { status: 404 });
    }

    let user = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, body.username as string)
    });

    if (!user) {
        //create new user with simple password
        await db.insert(usersTable).values({ username: body.username, password: body.username });
        user = await db.query.usersTable.findFirst({
            where: eq(usersTable.username, body.username as string)
        });
    
    }

    const map = await db.query.mapsTable.findFirst({
        where: eq(mapsTable.name, body.map as string)
    });

    if (!map || !user) {
        return NextResponse.json({ error: "Map" }, { status: 404 });
    }

    let date = today(getLocalTimeZone());
    // Save new fin
    await db.insert(finishesTable).values({
        userId: user?.id,
        mapId: map?.id,
        clip: body.clip,
        date: `${date?.year}-${date?.month}-${date?.day}` as string
    });

    // add check to not duplicate clips

    return NextResponse.json({})
}