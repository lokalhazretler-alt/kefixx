"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-context"

export function AgreementTab() {
  const { agreement, setAgreement } = useStudio()
  const [draft, setDraft] = useState(agreement)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setAgreement(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Satın Alım Sözleşmesi</h2>
        <p className="text-sm text-muted-foreground">
          Müşterilerin sepette onaylaması gereken sözleşme metnini düzenle.
        </p>
      </div>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={20}
        className="w-full rounded-xl border border-border bg-input px-4 py-3 font-mono text-sm leading-relaxed text-foreground outline-none focus:border-primary"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 glow-primary"
        >
          Sözleşmeyi Kaydet
        </button>
        {saved && <span className="text-sm text-emerald-400">Kaydedildi</span>}
      </div>
    </div>
  )
}
