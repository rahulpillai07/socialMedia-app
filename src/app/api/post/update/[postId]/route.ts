import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,{params}:{params:{postId:string}}){
    try{
        const postId=params.postId;
        console.log(postId);
        const updatedBody=await req.json();
        const toBeUpdatedPost=await prisma.post.update({
            where:{
                id:postId
            },data:{
                content:updatedBody?.content
            }
        })
        return NextResponse.json({data:toBeUpdatedPost})

    }
    catch(error){
        console.error();
        return NextResponse.json(
            {erorr:'something went wrong '},
            {status:500}
        )
    }
}