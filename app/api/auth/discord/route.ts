import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { STATE_COOKIE } from "@/lib/discord-session"

export async function GET(request: NextRequest) {
  const clientId = process.env.DISCORD_CLIENT_ID
  const redirectUri = process.env.DISCORD_REDIRECT_URI
  const origin = new URL(request.url).origin

  if (!clientId || !redirectUri) {
    return NextResponse.redirect(`${origin}/?login=yapilandirilmadi`)
  }

  const state = crypto.randomBytes(16).toString("hex")

  const authorizeUrl = new URL("https://discord.com/api/oauth2/authorize")
  authorizeUrl.searchParams.set("client_id", clientId)
  authorizeUrl.searchParams.set("redirect_uri", redirectUri)
  authorizeUrl.searchParams.set("response_type", "code")
  authorizeUrl.searchParams.set("scope", "identify")
  authorizeUrl.searchParams.set("state", state)
  authorizeUrl.searchParams.set("prompt", "consent")

  const response = NextResponse.redirect(authorizeUrl.toString())
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
    path: "/",
  })
  return response
}
