"use client"

import { Check, Plus, Star } from "lucide-react"
import { useStudio } from "@/lib/studio-context"
import { formatPrice, type Product } from "@/lib/data"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStudio()

  return (
    <article
      className={`glass relative flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 ${
        product.popular ? "neon-glow border-primary/50" : "hover:border-primary/40"
      }`}
    >
      {product.popular && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
          <Star className="size-3 fill-current" />
          Popüler
        </span>
      )}

      <h3 className="font-heading text-lg font-bold text-balance">{product.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between gap-3 border-t border-border pt-5">
        <div>
          <span className="font-heading text-2xl font-bold">{formatPrice(product.price)}</span>
          <p className="text-xs text-muted-foreground">tek seferlik</p>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Sepete Ekle
        </button>
      </div>
    </article>
  )
}
