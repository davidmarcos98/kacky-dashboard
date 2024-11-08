import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';

export async function GET(req: NextRequest, { params }: { params: Promise<{ map: string }> }){
    /* 
        /addcom !clip $(customapi https://kacky.socr.am/api/twitch/clip/[MAP])
    */
    return new NextResponse(`Wrong arguments.`);

}
