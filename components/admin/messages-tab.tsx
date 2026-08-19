"use client"

import { useState, useRef, useEffect } from "react"
import { useStudio } from "@/lib/studio-context"

function timeAgo(ts: number) {
  const mins = Math.floor((Date.now() - ts) / 60000)
  if (mins < 1) return "az önce"
  if (mins < 60) return `${mins} dk önce`
  return `${Math.floor(mins / 60)} sa önce`
}

export function MessagesTab() {
  const { messages, sendMessage } = useStudio()
  const [text, setText] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  function handleSend() {
    if (!text.trim()) return
    sendMessage(text.trim())
    setText("")
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Canlı Mesaj Akışı</h2>
        <p className="text-sm text-muted-foreground">Discord kanalından gelen mesajlar burada görüntülenir.</p>
      </div>

      <div className="glass flex h-[440px] flex-col rounded-xl">
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-foreground">#kefix-studio</span>
          <span className="text-xs text-muted-foreground">canlı</span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className="flex gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: m.avatarColor }}
              >
                {m.author.charAt(0)}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-foreground">{m.author}</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(m.timestamp)}</span>
                </div>
                <p className="text-sm text-foreground/90">{m.content}</p>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="flex gap-2 border-t border-border/50 p-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) handleSend()
            }}
            placeholder="#kefix-studio kanalına mesaj gönder"
            className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
          <button
            onClick={handleSend}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  )
}
