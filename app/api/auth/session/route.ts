import { NextResponse } from "next/server"
import { getSessionUser } from "@/lib/discord-session"
import { OWNER_DISCORD_ID } from "@/lib/data"

export async function GET() {
  const user = await getSessionUser()
  return NextResponse.json({
    user,
    isOwner: user?.discordId === OWNER_DISCORD_ID,
  })
}
