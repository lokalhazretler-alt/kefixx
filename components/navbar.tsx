"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, ShieldCheck, LogOut, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { DiscordIcon } from "./icons"
import { LoginDialog } from "./login-dialog"
import { useStudio } from "@/lib/studio-context"

const LINKS = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#paketler", label: "Paketler" },
  { href: "#ekip", label: "Ekip" },
  { href: "#iletisim", label: "İletişim" },
]

export function Navbar() {
  const { cart, setCartOpen, user, isOwner, logout } = useStudio()
  const [loginOpen, setLoginOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kefix Studio V2 ana sayfa">
            <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary neon-glow">
              <span className="font-heading text-base font-bold">K</span>
            </span>
            <span className="font-heading text-lg font-bold tracking-tight">
              Kefix Studio <span className="text-primary neon-text">V2</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Ana menü">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Sepeti aç"
              className="relative grid size-9 place-items-center rounded-lg border border-border bg-secondary/40 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <ShoppingCart className="size-4" />
              {cart.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cart.length}
                </span>
              )}
            </button>

            {isOwner && (
              <Link
                href="/admin"
                className="hidden items-center gap-1.5 rounded-lg border border-primary/50 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 sm:flex"
              >
                <ShieldCheck className="size-4" />
                Admin
              </Link>
            )}

            {user ? (
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm font-medium transition-colors hover:border-primary/60 sm:flex"
              >
                <LogOut className="size-4" />
                <span className="max-w-28 truncate">{user.username}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="hidden items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex"
              >
                <DiscordIcon className="size-4" />
                Discord ile Giriş Yap
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menüyü aç/kapat"
              className="grid size-9 place-items-center rounded-lg border border-border bg-secondary/40 md:hidden"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-background/95 px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobil menü">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              {isOwner && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-primary"
                >
                  Admin Paneli
                </Link>
              )}
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground"
                >
                  Çıkış yap ({user.username})
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setLoginOpen(true)
                    setMobileOpen(false)
                  }}
                  className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <DiscordIcon className="size-4" />
                  Discord ile Giriş Yap
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
