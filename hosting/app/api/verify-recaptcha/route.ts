import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
      console.error("Missing RECAPTCHA_SECRET_KEY");
      return NextResponse.json(
        { success: false, error: "Missing secret key" },
        { status: 500 },
      );
    }

    if (!token) {
      console.error("Missing token");
      return NextResponse.json(
        { success: false, error: "Missing token" },
        { status: 400 },
      );
    }

    const ip = req.headers.get("x-forwarded-for") || "";

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip)}`,
      },
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("reCAPTCHA verification failed:", data);
      return NextResponse.json(
        { success: false, error: "reCAPTCHA verification failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: data.success,
      errors: data["error-codes"] || null,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
