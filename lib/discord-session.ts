import { cookies } from "next/headers"
import crypto from "crypto"

export const SESSION_COOKIE = "kefix_session"
export const STATE_COOKIE = "kefix_oauth_state"

export type SessionUser = {
  discordId: string
  username: string
  avatar?: string | null
}

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    // Prod'da mutlaka .env içinde güçlü, rastgele bir SESSION_SECRET tanımlanmalı.
    throw new Error(
      "SESSION_SECRET ortam değişkeni tanımlı değil. .env dosyanıza rastgele, uzun bir değer ekleyin.",
    )
  }
  return secret
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url")
}

export function createSessionToken(user: SessionUser) {
  const payload = Buffer.from(JSON.stringify(user)).toString("base64url")
  const signature = sign(payload)
  return `${payload}.${signature}`
}

export function verifySessionToken(token: string | undefined | null): SessionUser | null {
  if (!token) return null
  const parts = token.split(".")
  if (parts.length !== 2) return null
  const [payload, signature] = parts

  const expected = sign(payload)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    if (typeof parsed?.discordId !== "string") return null
    return parsed as SessionUser
  } catch {
    return null
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies()
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}
