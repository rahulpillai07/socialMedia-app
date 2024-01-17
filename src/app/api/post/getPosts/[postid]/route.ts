import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { postid: string } }) {
    try {
      const postid = params.postid;
      console.log('Post ID:', postid);
  
      const post = await prisma.post.findUnique({
        where: {
          id: postid,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
        },
      });
  
      if (!post) {
        console.log('Post not found');
        return NextResponse.error();
      }
  
      return NextResponse.json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      return NextResponse.error();
    }
  }
  