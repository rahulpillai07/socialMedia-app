import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest){
const searchParams = req.nextUrl.searchParams;
const userId = searchParams.get("userId");
console.log(userId);
if (userId !== null) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user === null) {
    // Handle the case where the user is not found
    return NextResponse.json(
      { error: "The user does not exist" },
      { status: 404 }
    );
  }

  // Continue with your logic using the `user` data
  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json({ data: posts });
} else {
  // Handle the case where userId is null
  return NextResponse.json(
    { error: "userId is missing in the query parameters" },
    { status: 400 }
  );
}

}