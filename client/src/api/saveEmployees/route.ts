import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const { employees } = await request.json();
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "employees.json"
    );
    await fs.writeFile(filePath, JSON.stringify({ employees }, null, 2));
    return NextResponse.json({ message: "Employees saved successfully" });
  } catch (error) {
    console.error("Error saving employees:", error);
    return NextResponse.json(
      { error: "Failed to save employees" },
      { status: 500 }
    );
  }
}
