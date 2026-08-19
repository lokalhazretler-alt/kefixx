"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-context"

export function TeamTab() {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useStudio()
  const [draft, setDraft] = useState({ name: "", role: "", discord: "" })

  function handleAdd() {
    if (!draft.name.trim()) return
    addTeamMember({ name: draft.name, role: draft.role, discord: draft.discord })
    setDraft({ name: "", role: "", discord: "" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Ekip Yönetimi</h2>
        <p className="text-sm text-muted-foreground">Ekip üyelerini ekle, düzenle veya kaldır.</p>
      </div>

      <div className="glass rounded-xl p-4">
        <h3 className="mb-3 font-heading font-semibold text-foreground">Yeni Üye Ekle</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            placeholder="İsim"
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
          <input
            value={draft.role}
            onChange={(e) => setDraft({ ...draft, role: e.target.value })}
            placeholder="Görev"
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
          <input
            value={draft.discord}
            onChange={(e) => setDraft({ ...draft, discord: e.target.value })}
            placeholder="Discord kullanıcı adı"
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 glow-primary"
        >
          Üye Ekle
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {team.map((member) => (
          <div key={member.id} className="glass rounded-xl p-4">
            <div className="grid gap-2">
              <input
                value={member.name}
                onChange={(e) => updateTeamMember(member.id, { name: e.target.value })}
                className="rounded-lg border border-border bg-input px-3 py-2 text-sm font-semibold text-foreground outline-none focus:border-primary"
              />
              <input
                value={member.role}
                onChange={(e) => updateTeamMember(member.id, { role: e.target.value })}
                className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-muted-foreground outline-none focus:border-primary"
              />
              <input
                value={member.discord}
                onChange={(e) => updateTeamMember(member.id, { discord: e.target.value })}
                className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-muted-foreground outline-none focus:border-primary"
              />
            </div>
            <button
              onClick={() => deleteTeamMember(member.id)}
              className="mt-3 rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10"
            >
              Kaldır
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
