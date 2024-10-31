// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from "drizzle-orm";
import { mapsTable, usersTable, finishesTable } from "../../../db/schema";
import { db } from "../../../db/client";
import axios, { AxiosResponse } from "axios";


async function isStreamerLive(channel: string): Promise<boolean> {
    const url: string = `https://www.twitch.tv/${channel}`;
    try {
        const response: AxiosResponse = await axios.get(url);
        const data: string = response.data;
        return data.includes('isLiveBroadcast');
    } catch (error) {
        console.log(`Error fetching Twitch page: ${error}`);
        return false;
    }
}


export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams
    
    if (searchParams.get("user")) {
        const isLive = await isStreamerLive(searchParams.get("user") as string);
        return NextResponse.json({isLive: isLive})
    }
    return NextResponse.json({isLive: false})
}
