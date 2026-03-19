import { NextResponse } from "next/server";

const KEY_FRAGMENTS = ["GUILDA", "MESTRA", "2026"];
const EXPECTED_KEY = KEY_FRAGMENTS.join("_");

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.key !== "string") {
    return NextResponse.json(
      {
        ok: false,
        message: "Sequência inválida.",
      },
      { status: 400 },
    );
  }

  const normalizedKey = body.key.trim().toUpperCase();

  if (normalizedKey !== EXPECTED_KEY) {
    return NextResponse.json(
      {
        ok: false,
        message: "Sequência inválida.",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({ ok: true });
}
