import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dues = await prisma.dues.findMany({
      where: {
        isArchived: false,
      },
    });
    return NextResponse.json(dues);
  } catch (error) {
    console.error('Failed to fetch dues:', error);
    return NextResponse.json({ error: 'Failed to fetch dues' }, { status: 500 });
  }
}
