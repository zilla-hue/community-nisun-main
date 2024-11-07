

import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';
import { Child, GetChildrenResponseType, DeleteChildrenRequestBody } from './types';
import { getUser } from "@/lib/lucia";

// Function to get all children
async function getChildren(userId: string): Promise<GetChildrenResponseType> {
  try {
    const children = await prisma.child.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return children;
  } catch (error) {
    console.error("Error in getChildren function:", error);
    throw new Error("Unable to fetch children");
  }
}

// Handler for GET request to retrieve all children or a single child
export async function GET(request: Request) {
  const { user } = await getUser();

  if (!user?.id) {
    return NextResponse.redirect('/authenticate/sign-in');
  }

  const url = new URL(request.url);
  const childId = url.searchParams.get("childId");

  if (childId) {
    return getSingleChild(user.id, childId);
  } else {
    const children = await getChildren(user.id);
    return NextResponse.json(children);
  }
}

// Function to get a single child by ID
async function getSingleChild(userId: string, childId: string) {
  try {
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: userId,
      },
    });

    if (!child) {
      return new Response("Child not found", { status: 404 });
    }

    return NextResponse.json(child);
  } catch (error) {
    console.error("Error in getSingleChild function:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Handle DELETE requests for bulk and single deletion of children
export async function DELETE(request: Request) {
  try {
    const { user } = await getUser();

    if (!user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const childId = url.searchParams.get("childId");

    if (childId) {
      await prisma.child.delete({
        where: {
          id: childId,
          userId: user.id,
        },
      });
    } else {
      const { childIds }: DeleteChildrenRequestBody = await request.json();

      if (!Array.isArray(childIds) || childIds.length === 0) {
        return new Response("No child IDs provided", { status: 400 });
      }

      await prisma.child.deleteMany({
        where: {
          id: {
            in: childIds,
          },
          userId: user.id,
        },
      });
    }

    const remainingChildren = await getChildren(user.id);
    return NextResponse.json(remainingChildren);
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Handler for PATCH requests for updating a child’s details
export async function PATCH(request: Request) {
  try {
    const { user } = await getUser();

    if (!user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { childId, data }: { childId: string; data: Partial<ChildUpdateData> } = await request.json();

    if (!childId || !data) {
      return new Response("Invalid request payload", { status: 400 });
    }

    const updatedChild = await prisma.child.update({
      where: {
        id: childId,
        userId: user.id,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(updatedChild);
  } catch (error) {
    console.error("Error in PATCH function:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Type for updating child data
export type ChildUpdateData = {
  first_name?: string;
  last_name?: string;
  birth_date?: Date;
};
