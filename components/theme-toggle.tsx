"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Aydınlık temaya geç" : "Karanlık temaya geç"}
      className="grid size-9 place-items-center rounded-lg border border-border bg-secondary/40 text-foreground transition-colors hover:border-primary/60 hover:text-primary"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
