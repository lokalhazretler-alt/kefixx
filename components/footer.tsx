import { DiscordIcon } from "./icons"
import { DISCORD_INVITE } from "@/lib/data"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
            <span className="font-heading text-sm font-bold">K</span>
          </span>
          <span className="font-heading text-base font-bold">
            Kefix Studio <span className="text-primary">V2</span>
          </span>
        </div>

        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
        >
          <DiscordIcon className="size-4" />
          discord.gg/kefixstudio
        </a>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Kefix Studio. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  )
}
