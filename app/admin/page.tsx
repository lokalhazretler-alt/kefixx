"use client"

import { useState } from "react"
import Link from "next/link"
import { useStudio, OWNER_DISCORD_ID } from "@/lib/studio-context"
import { ProductsTab } from "@/components/admin/products-tab"
import { OrdersTab } from "@/components/admin/orders-tab"
import { TeamTab } from "@/components/admin/team-tab"
import { AgreementTab } from "@/components/admin/agreement-tab"
import { MessagesTab } from "@/components/admin/messages-tab"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoginDialog } from "@/components/login-dialog"

type TabId = "products" | "orders" | "team" | "agreement" | "messages"

const TABS: { id: TabId; label: string }[] = [
  { id: "products", label: "Ürün & Kategori" },
  { id: "orders", label: "Siparişler" },
  { id: "messages", label: "Canlı Mesaj Akışı" },
  { id: "team", label: "Ekip" },
  { id: "agreement", label: "Sözleşme" },
]

export default function AdminPage() {
  const { user, isOwner, mode, setMode, orders } = useStudio()
  const [tab, setTab] = useState<TabId>("orders")
  const [loginOpen, setLoginOpen] = useState(false)

  const overdueCount = orders.filter(
    (o) => o.status === "pending" && (Date.now() - o.createdAt) / 3600000 > 30,
  ).length

  // Not logged in
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="glass max-w-md space-y-4 rounded-2xl p-8">
          <h1 className="font-heading text-2xl font-bold text-foreground">Admin Paneli</h1>
          <p className="text-sm text-muted-foreground">
            Panele erişmek için Discord ile giriş yapmalısın. Owner Discord ID:{" "}
            <span className="font-mono text-primary">{OWNER_DISCORD_ID}</span>
          </p>
          <button
            onClick={() => setLoginOpen(true)}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 glow-primary"
          >
            Discord ile Giriş Yap
          </button>
          <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground">
            Ana sayfaya dön
          </Link>
        </div>
        <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    )
  }

  // Logged in but not owner
  if (!isOwner) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="glass max-w-md space-y-4 rounded-2xl p-8 ring-1 ring-destructive/40">
          <h1 className="font-heading text-2xl font-bold text-destructive">Yetkisiz Erişim</h1>
          <p className="text-sm text-muted-foreground">
            Bu panele yalnızca Owner erişebilir. Giriş yaptığın hesap:{" "}
            <span className="font-mono text-foreground">{user.discordId}</span>
          </p>
          <Link
            href="/"
            className="block rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-heading text-lg font-bold text-foreground">
              Kefix Studio <span className="text-primary">Admin</span>
            </Link>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">Owner</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode toggle */}
            <div className="flex items-center rounded-lg border border-border p-0.5">
              <button
                onClick={() => setMode("live")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  mode === "live" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Canlı Mod
              </button>
              <button
                onClick={() => setMode("test")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  mode === "test" ? "bg-amber-500 text-black" : "text-muted-foreground"
                }`}
              >
                Test Modu
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row">
        {/* Sidebar tabs */}
        <nav className="flex gap-2 overflow-x-auto md:w-52 md:flex-col md:overflow-visible">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center justify-between gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition ${
                tab === t.id ? "glass text-foreground glow-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {t.id === "orders" && overdueCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-bold text-destructive-foreground">
                  {overdueCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1">
          {tab === "products" && <ProductsTab />}
          {tab === "orders" && <OrdersTab />}
          {tab === "messages" && <MessagesTab />}
          {tab === "team" && <TeamTab />}
          {tab === "agreement" && <AgreementTab />}
        </main>
      </div>
    </div>
  )
}
