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
  const { name, email, password } = await req.json();
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const trimmedPassword = typeof password === "string" ? password.trim() : "";

  if (!trimmedName || !trimmedEmail || !trimmedPassword) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email: trimmedEmail } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const username = await generateUniqueUsername(trimmedEmail);
  const hashed = await hashPassword(trimmedPassword);

  const user = await prisma.user.create({
    data: {
      name: trimmedName,
      email: trimmedEmail,
      password: hashed,
      username,
    },
  });

  const token = signToken({ userId: user.id });

  const res = NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}