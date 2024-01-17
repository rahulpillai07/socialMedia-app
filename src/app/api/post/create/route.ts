import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const newPost = await prisma.post.create({
      data: {
        userId: "65a792fe9b0bd153cbce70df",
        content: body?.content,
      },
    });
    return NextResponse.json({ message: newPost }, { status: 200 });
  } catch (error) {
    console.error();
    return NextResponse.json("error while creating a post ", {
      status: 500,
      statusText: "internal server error",
    });
  }
}
