import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hashPassword, signToken } from "@/app/lib/auth";

async function generateUniqueUsername(email: string) {
  const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  let username = base;
  let suffix = 0;

  while (await prisma.user.findUnique({ where: { username } })) {
    suffix++;
    username = `${base}${suffix}`;
  }

  return username;
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const username = await generateUniqueUsername(email);
  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashed, username },
  });

  const token = signToken({ userId: user.id });

  const res = NextResponse.json({ id: user.id, email: user.email, username: user.username });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}