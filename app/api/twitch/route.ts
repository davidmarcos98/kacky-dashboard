// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { eq } from "drizzle-orm";
import { usersTable, finishesTable, mapsTable } from "../../../db/schema";
import { db } from "../../../db/client";
import { genSaltSync, hashSync, compare } from 'bcrypt-ts';

export async function POST(req: NextRequest){
    const body = await req.json();

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.username, body.username as string)
    });

    let match = await compare(body.password, user?.password! as string)

    if (!match) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const map = await db.query.mapsTable.findFirst({
        where: eq(mapsTable.name, body.map as string)
    });

    if (!map || !user) {
        return NextResponse.json({ error: "Map or user not found" }, { status: 404 });
    }

    // Save new fin
    await db.insert(finishesTable).values({
        userId: user?.id,
        mapId: map?.id,
        clip: body.clip,
        date: body.date
    });

    return NextResponse.json({})
}
