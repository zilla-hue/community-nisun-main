// api/children/handlers.ts
import { getUser } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';
import { GetMembersResponseType, MemberUpdateData } from './types';
import { Role, MS } from "@prisma/client";

// Function to get all members
async function getMembers(): Promise<GetMembersResponseType> {
  try {
    const members = await prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        birth_date: true,
        email: true,
        phone_number: true,
        role: true,
        membership_status: true,
        dues_paid: true,
        isSubscribed: true,
        isOnboarded: true,
        middle_name: true,
        picture: true,
        address: true,
        customerId: true,
      },
    });

    return members as unknown as GetMembersResponseType;
  } catch (error) {
    console.error("Error in getMembers function:", error);
    throw new Error("Unable to fetch members");
  }
}

// Handler for GET request to retrieve all members or a single member
export async function GET(request: Request) {
  const { user } = await getUser();

  if (!user?.id) {
    return NextResponse.redirect('/authenticate/sign-in');
  }

  const url = new URL(request.url);
  const memberId = url.searchParams.get("memberId");

  if (memberId) {
    return getSingleMember(memberId);
  } else {
    const members = await getMembers();
    return NextResponse.json(members);
  }
}

// Function to get a single member by ID
async function getSingleMember(memberId: string) {
  try {
    const member = await prisma.user.findFirst({
      where: {
        id: memberId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        birth_date: true,
        email: true,
        phone_number: true,
        role: true,
        membership_status: true,
        dues_paid: true,
        isSubscribed: true,
        isOnboarded: true,
        middle_name: true,
        picture: true,
        address: true,
        customerId: true,
      },
    });

    if (!member) {
      return new Response("Member not found", { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error in getSingleMember function:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Handle DELETE requests for bulk and single deletion of members
export async function DELETE(request: Request) {
  try {
    const { user } = await getUser();

    if (!user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const memberId = url.searchParams.get("memberId");

    if (memberId) {
      await prisma.user.delete({
        where: {
          id: memberId,
        },
      });
    } else {
      const { memberIds }: { memberIds: string[] } = await request.json();

      if (!Array.isArray(memberIds) || memberIds.length === 0) {
        return new Response("No member IDs provided", { status: 400 });
      }

      await prisma.user.deleteMany({
        where: {
          id: {
            in: memberIds,
          },
        },
      });
    }

    const remainingMembers = await getMembers();
    return NextResponse.json(remainingMembers);
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Handler for PATCH requests for updating a member’s details
export async function PATCH(request: Request) {
  try {
    const { user } = await getUser();

    if (!user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { memberId, data }: { memberId: string; data: MemberUpdateData } = await request.json();

    if (!memberId || !data) {
      return new Response("Invalid request payload", { status: 400 });
    }

    const updatedMember = await prisma.user.update({
      where: {
        id: memberId,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error("Error in PATCH function:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}