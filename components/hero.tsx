"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { DiscordIcon } from "./icons"
import { DISCORD_INVITE } from "@/lib/data"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--primary), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Yeni Nesil Geliştirici & Oyuncu Platformu
          </span>

          <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Sunucunu <span className="text-primary neon-text">bir üst seviyeye</span> taşıyan hizmetler
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Kefix Studio V2 ile optimize edilmiş FiveM sistemleri, ihtiyacına özel Discord botları ve etkili
            reklam paketlerine tek bir yerden ulaş. Profesyonel, hızlı ve güvenilir.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#paketler"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 neon-glow"
            >
              Hizmetleri İncele
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/40 px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary"
            >
              <DiscordIcon className="size-4" />
              Discord Sunucumuz
            </a>
          </div>

          <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
            {[
              { value: "150+", label: "Tamamlanan Proje" },
              { value: "7/24", label: "Aktif Destek" },
              { value: "3", label: "Hizmet Kategorisi" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl px-4 py-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-2xl font-bold text-primary sm:text-3xl">{stat.value}</dd>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
