"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-context"

function hoursSince(ts: number) {
  return (Date.now() - ts) / (1000 * 60 * 60)
}

export function OrdersTab() {
  const { orders, setOrderStatus } = useStudio()
  const [alarmed, setAlarmed] = useState<Record<string, boolean>>({})

  const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Siparişler</h2>
        <p className="text-sm text-muted-foreground">
          30 saatten uzun süredir bekleyen siparişler kırmızı alarm ile işaretlenir.
        </p>
      </div>

      {sorted.length === 0 && (
        <div className="glass rounded-xl p-8 text-center text-muted-foreground">Henüz sipariş yok.</div>
      )}

      <div className="space-y-3">
        {sorted.map((order) => {
          const overdue = order.status === "pending" && hoursSince(order.createdAt) > 30
          const hrs = Math.floor(hoursSince(order.createdAt))
          return (
            <div
              key={order.id}
              className={`glass rounded-xl p-4 ${overdue ? "ring-2 ring-destructive glow-danger" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-foreground">#{order.id}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.mode === "test"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-primary/15 text-primary"
                      }`}
                    >
                      {order.mode === "test" ? "TEST" : "CANLI"}
                    </span>
                    {overdue && (
                      <span className="animate-pulse rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-bold text-destructive">
                        GECİKMİŞ · {hrs}s
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Discord ID: <span className="text-foreground">{order.discordId}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sunucu: <span className="text-foreground">{order.serverName}</span> ·{" "}
                    <a href={order.serverInvite} className="text-primary hover:underline">
                      {order.serverInvite}
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ürünler:{" "}
                    <span className="text-foreground">{order.items.map((i) => i.name).join(", ")}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-lg font-bold text-primary">
                    {order.total.toLocaleString("tr-TR")} ₺
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 border-t border-border/50 pt-3">
                {(["pending", "fulfilled", "unreachable"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setOrderStatus(order.id, s)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      order.status === s
                        ? s === "fulfilled"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : s === "unreachable"
                            ? "bg-destructive/20 text-destructive"
                            : "bg-primary/20 text-primary"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s === "pending" ? "Beklemede" : s === "fulfilled" ? "Tamamlandı" : "Ulaşılamıyor"}
                  </button>
                ))}
                {overdue &&
                  (alarmed[order.id] ? (
                    <span className="rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-400">
                      DM alarmı gönderildi
                    </span>
                  ) : (
                    <button
                      onClick={() => setAlarmed((prev) => ({ ...prev, [order.id]: true }))}
                      className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-bold text-destructive-foreground transition hover:opacity-90 glow-danger"
                    >
                      DM Alarmı Gönder
                    </button>
                  ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
