"use client"

import { Server, Bot, Megaphone, type LucideIcon } from "lucide-react"
import { ProductCard } from "./product-card"
import { useStudio } from "@/lib/studio-context"
import { CATEGORIES, type CategoryId } from "@/lib/data"

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  fivem: Server,
  "discord-bot": Bot,
  advertising: Megaphone,
}

export function Catalog() {
  const { products } = useStudio()

  return (
    <section id="paketler" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div id="hizmetler" className="scroll-mt-24">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Hizmetler & <span className="text-primary">Paketler</span>
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Yalnızca üç ana kategoride uzmanlaşıyoruz: FiveM sistemleri, özel Discord botları ve reklam / ek
            hizmetler. Her pakette şeffaf fiyat ve net kapsam.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-16">
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id]
            const items = products.filter((p) => p.category === category.id)
            if (items.length === 0) return null
            return (
              <div key={category.id}>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.tagline}</p>
                  </div>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
