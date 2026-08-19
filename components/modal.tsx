"use client"

import { useEffect, type ReactNode } from "react"
import { X } from "lucide-react"

export function Modal({
  open,
  onClose,
  title,
  children,
  className = "",
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`glass neon-glow relative z-10 w-full max-w-lg rounded-2xl p-6 shadow-2xl duration-200 animate-in fade-in zoom-in-95 ${className}`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          {title ? <h2 className="font-heading text-xl font-bold text-balance">{title}</h2> : <span />}
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
