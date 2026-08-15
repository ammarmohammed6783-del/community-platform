import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { hashPassword, signToken } from "../../../lib/auth";

export async function POST(req: Request) {
  const { email, password, name, username } = await req.json();

  if (!email || !password || !name || !username) {
    return NextResponse.json({ error: "Email and password and name and username required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed, name, username },
  });

  const token = signToken({ userId: user.id });

  const res = NextResponse.json({ id: user.id, email: user.email, name: user.name });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}