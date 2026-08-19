"use client"

import { ArrowRight } from "lucide-react"
import { DiscordIcon } from "./icons"
import { DISCORD_INVITE } from "@/lib/data"

export function ContactSection() {
  return (
    <section id="iletisim" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="glass neon-glow relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side at 50% 0%, var(--primary), transparent)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Projeni birlikte <span className="text-primary">hayata geçirelim</span>
            </h2>
            <p className="mx-auto mt-4 text-pretty text-muted-foreground">
              Tüm sipariş, destek ve iş birliği süreçlerimizi Discord üzerinden yürütüyoruz. Bize katıl, birkaç
              dakika içinde dönüş yapalım.
            </p>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <DiscordIcon className="size-4" />
              discord.gg/kefixstudio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
