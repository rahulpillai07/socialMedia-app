import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest){
    const userBody=await req.json();
    console.log(`request body:${userBody?.email}`)
    if(!userBody?.username || !userBody?.email){
        return new Response("invalid credentials", {
            status:401  ,
            statusText: "internal server error",
    })
    }
    try {
        const { email, username,  password } = userBody;
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const user = await prisma.user.create({
          data: {
            email:email,
            username:username,
            password:hashedPassword,
          }
        });
        return NextResponse.json({data:user},{status:200});
    }
    catch(error){
        console.error();
        return new NextResponse('',{
            status:500,
            statusText:"internal server error"
        })
    }
}
