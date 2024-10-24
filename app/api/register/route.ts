// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from 'next/server';

import { generate } from 'generate-password';
import 'dotenv/config';
import { usersTable } from "../../../db/schema";
import { db } from "../../../db/client";
import { genSaltSync, hashSync } from 'bcrypt-ts';

export async function POST(req: NextRequest){
    let password = generate({
        length: 10,
        numbers: true
    })
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);
  
    await db.insert(usersTable).values({ username: password, password: hash });
  
    return NextResponse.json({})
}

