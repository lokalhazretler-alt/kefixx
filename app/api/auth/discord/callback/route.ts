import { type NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE, STATE_COOKIE, createSessionToken } from "@/lib/discord-session"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = new URL(request.url).origin

  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const oauthError = searchParams.get("error")

  const savedState = request.cookies.get(STATE_COOKIE)?.value

  if (oauthError || !code || !state || !savedState || state !== savedState) {
    const response = NextResponse.redirect(`${origin}/?login=hata`)
    response.cookies.delete(STATE_COOKIE)
    return response
  }

  const clientId = process.env.DISCORD_CLIENT_ID
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  const redirectUri = process.env.DISCORD_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(`${origin}/?login=yapilandirilmadi`)
  }

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    })

    if (!tokenResponse.ok) {
      return NextResponse.redirect(`${origin}/?login=hata`)
    }

    const tokenData: { access_token: string } = await tokenResponse.json()

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store",
    })

    if (!userResponse.ok) {
      return NextResponse.redirect(`${origin}/?login=hata`)
    }

    const discordUser: {
      id: string
      username: string
      global_name?: string | null
      avatar?: string | null
    } = await userResponse.json()

    const sessionToken = createSessionToken({
      discordId: discordUser.id,
      username: discordUser.global_name || discordUser.username,
      avatar: discordUser.avatar
        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
        : null,
    })

    const response = NextResponse.redirect(`${origin}/?login=basarili`)
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    response.cookies.delete(STATE_COOKIE)
    return response
  } catch {
    return NextResponse.redirect(`${origin}/?login=hata`)
  }
}
