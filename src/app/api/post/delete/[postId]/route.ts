import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    if (!postId) {
      return NextResponse.json(
        { error: "the post does not exist" },
        { status: 401 }
      );
    }
    await prisma.post.delete({
        where:{
            id:postId
        }
    })
    return NextResponse.json({message:"the post is succesfully deleted"})
  } catch (error) {
    console.error();
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
 