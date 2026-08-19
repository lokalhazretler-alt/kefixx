"use client"

import { Modal } from "./modal"
import { useStudio } from "@/lib/studio-context"

export function AgreementDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { agreement } = useStudio()

  return (
    <Modal open={open} onClose={onClose} title="Satın Alım Sözleşmesi" className="max-w-2xl">
      <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-secondary/30 p-4">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
          {agreement}
        </pre>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Okudum, Kapat
      </button>
    </Modal>
  )
}
