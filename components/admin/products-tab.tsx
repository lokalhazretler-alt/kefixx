"use client"

import { useState } from "react"
import { Plus, Trash2, Save, X } from "lucide-react"
import { useStudio } from "@/lib/studio-context"
import { CATEGORIES, formatPrice, type CategoryId, type Product } from "@/lib/data"

export function ProductsTab() {
  const { products, addProduct, updateProduct, deleteProduct } = useStudio()
  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState("")
  const [category, setCategory] = useState<CategoryId>("fivem")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [features, setFeatures] = useState("")

  const resetForm = () => {
    setName("")
    setCategory("fivem")
    setPrice("")
    setDescription("")
    setFeatures("")
    setShowForm(false)
  }

  const handleAdd = () => {
    if (!name.trim() || !price) return
    addProduct({
      name: name.trim(),
      category,
      price: Number(price),
      description: description.trim(),
      features: features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    })
    resetForm()
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold">Ürün & Kategori Yönetimi</h2>
          <p className="text-sm text-muted-foreground">Ürün ekleyin, fiyat ve açıklamalarını düzenleyin.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? "Vazgeç" : "Yeni Ürün"}
        </button>
      </div>

      {showForm && (
        <div className="glass mb-6 rounded-2xl p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Ürün Adı</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Kategori</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 outline-none focus:border-primary"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-card">
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Fiyat (TRY)</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Açıklama</span>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                Özellikler (her satır bir özellik)
              </span>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 outline-none focus:border-primary"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!name.trim() || !price}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
          >
            <Plus className="size-4" />
            Ürünü Ekle
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductRow key={product.id} product={product} onUpdate={updateProduct} onDelete={deleteProduct} />
        ))}
      </div>
    </div>
  )
}

function ProductRow({
  product,
  onUpdate,
  onDelete,
}: {
  product: Product
  onUpdate: (id: string, patch: Partial<Product>) => void
  onDelete: (id: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState(String(product.price))
  const [description, setDescription] = useState(product.description)

  const category = CATEGORIES.find((c) => c.id === product.category)

  const save = () => {
    onUpdate(product.id, { price: Number(price), description })
    setEditing(false)
  }

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-sm font-bold">{product.name}</h3>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary">
              {category?.name}
            </span>
          </div>
          {editing ? (
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-secondary/40 px-2 py-1 text-sm outline-none focus:border-primary"
            />
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {editing ? (
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-24 rounded-lg border border-border bg-secondary/40 px-2 py-1 text-right text-sm outline-none focus:border-primary"
            />
          ) : (
            <span className="font-heading text-sm font-bold text-primary">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        {editing ? (
          <>
            <button
              type="button"
              onClick={save}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              <Save className="size-3.5" />
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              İptal
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/60 hover:text-primary"
            >
              Düzenle
            </button>
            <button
              type="button"
              onClick={() => onDelete(product.id)}
              aria-label={`${product.name} ürününü sil`}
              className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
