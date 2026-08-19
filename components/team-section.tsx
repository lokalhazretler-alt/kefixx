"use client"

import { useStudio } from "@/lib/studio-context"
import { DiscordIcon } from "./icons"

export function TeamSection() {
  const { team } = useStudio()

  return (
    <section id="ekip" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-primary">Ekibimizle</span> Tanışın
        </h2>
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
          Alanında deneyimli geliştirici ve tasarımcılardan oluşan çekirdek kadromuz.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article key={member.id} className="glass flex flex-col items-center rounded-2xl p-6 text-center">
              <span
                className="grid size-16 place-items-center rounded-full font-heading text-xl font-bold text-primary-foreground neon-glow"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}
                aria-hidden="true"
              >
                {member.name.charAt(0)}
              </span>
              <h3 className="mt-4 font-heading text-base font-bold">{member.name}</h3>
              <p className="mt-1 text-sm text-primary">{member.role}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                <DiscordIcon className="size-3.5" />
                {member.discord}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
