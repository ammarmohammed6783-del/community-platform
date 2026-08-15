import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "No session found" }, { status: 401 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", "", { maxAge: 0, path: "/" });
  return res;
}