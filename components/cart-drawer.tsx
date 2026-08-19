"use client"

import { useEffect, useState } from "react"
import { X, Trash2, ShoppingCart, CheckCircle2, FlaskConical } from "lucide-react"
import { AgreementDialog } from "./agreement-dialog"
import { useStudio } from "@/lib/studio-context"
import { formatPrice } from "@/lib/data"

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, cartTotal, createOrder, mode } = useStudio()

  const [discordId, setDiscordId] = useState("")
  const [serverName, setServerName] = useState("")
  const [serverInvite, setServerInvite] = useState("")
  const [accepted, setAccepted] = useState(false)
  const [agreementOpen, setAgreementOpen] = useState(false)
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (cartOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [cartOpen])

  const fieldsFilled = discordId.trim() && serverName.trim() && serverInvite.trim()
  const canPurchase = cart.length > 0 && accepted && fieldsFilled

  const handlePurchase = () => {
    if (!canPurchase) return
    const order = createOrder({ discordId, serverName, serverInvite })
    setConfirmedOrderId(order.id)
    setAccepted(false)
    setDiscordId("")
    setServerName("")
    setServerInvite("")
  }

  const close = () => {
    setCartOpen(false)
    setTimeout(() => setConfirmedOrderId(null), 300)
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sepet"
        className={`fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
            <ShoppingCart className="size-5 text-primary" />
            Sepetim
            {cart.length > 0 && <span className="text-sm text-muted-foreground">({cart.length})</span>}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Sepeti kapat"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {mode === "test" && (
          <div className="flex items-center gap-2 border-b border-border bg-accent/15 px-5 py-2.5 text-xs font-medium text-accent">
            <FlaskConical className="size-3.5" />
            Test Modu aktif — gerçek ödeme alınmaz.
          </div>
        )}

        {confirmedOrderId ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <CheckCircle2 className="size-14 text-primary" />
            <h3 className="font-heading text-xl font-bold">
              {mode === "test" ? "Test Siparişi Oluşturuldu" : "Siparişiniz Alındı"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Sipariş No: <span className="font-mono text-foreground">{confirmedOrderId}</span>
            </p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Ekibimiz Discord üzerinden en kısa sürede sizinle iletişime geçecektir.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Kapat
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                  <ShoppingCart className="size-10 opacity-40" />
                  <p className="text-sm">Sepetiniz boş. Bir paket ekleyin.</p>
                </div>
              ) : (
                <>
                  <ul className="flex flex-col gap-3">
                    {cart.map((item, index) => (
                      <li
                        key={`${item.productId}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/30 p-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          <p className="text-sm text-primary">{formatPrice(item.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(index)}
                          aria-label={`${item.name} ürününü kaldır`}
                          className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 space-y-3">
                    <h3 className="font-heading text-sm font-bold">Sipariş Bilgileri</h3>
                    <Field
                      id="cart-discord-id"
                      label="Discord ID"
                      required
                      value={discordId}
                      onChange={setDiscordId}
                      placeholder="örn. 123456789012345678"
                    />
                    <Field
                      id="cart-server-name"
                      label="Sunucu Adı"
                      required
                      value={serverName}
                      onChange={setServerName}
                      placeholder="Sunucunuzun adı"
                    />
                    <Field
                      id="cart-server-invite"
                      label="Sunucu Davet Linki"
                      required
                      value={serverInvite}
                      onChange={setServerInvite}
                      placeholder="https://discord.gg/..."
                    />
                  </div>

                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]"
                    />
                    <span className="leading-relaxed text-muted-foreground">
                      Kefix Studio{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setAgreementOpen(true)
                        }}
                        className="font-semibold text-[oklch(0.65_0.19_255)] underline decoration-dotted underline-offset-2 hover:opacity-80"
                      >
                        Satın Alım Sözleşmesi
                      </button>
                      &apos;ni okudum ve kabul ediyorum.
                    </span>
                  </label>
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border px-5 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Toplam</span>
                  <span className="font-heading text-xl font-bold">{formatPrice(cartTotal)}</span>
                </div>
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={!canPurchase}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all enabled:hover:opacity-90 enabled:neon-glow disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {mode === "test" ? (
                    <>
                      <FlaskConical className="size-4" />
                      Test Siparişi Oluştur
                    </>
                  ) : (
                    "Satın Al"
                  )}
                </button>
                {!canPurchase && (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {!fieldsFilled
                      ? "Lütfen tüm sipariş bilgilerini doldurun."
                      : "Devam etmek için sözleşmeyi onaylayın."}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </aside>

      <AgreementDialog open={agreementOpen} onClose={() => setAgreementOpen(false)} />
    </>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-muted-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  )
}
