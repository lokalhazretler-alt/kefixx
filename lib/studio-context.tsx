"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react"
import {
  INITIAL_PRODUCTS,
  INITIAL_TEAM,
  INITIAL_AGREEMENT,
  INITIAL_MESSAGES,
  INITIAL_ORDERS,
  OWNER_DISCORD_ID,
  type Product,
  type TeamMember,
  type Order,
  type OrderStatus,
  type ChatMessage,
  type CategoryId,
} from "./data"

export type StudioUser = {
  discordId: string
  username: string
  avatar?: string | null
}

type CartItem = { productId: string; name: string; price: number }

type CheckoutInfo = {
  discordId: string
  serverName: string
  serverInvite: string
}

type StudioContextValue = {
  // mode
  mode: "live" | "test"
  setMode: (m: "live" | "test") => void
  // auth
  user: StudioUser | null
  isOwner: boolean
  authLoading: boolean
  login: () => void
  logout: () => void
  // cart
  cart: CartItem[]
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  addToCart: (product: Product) => void
  removeFromCart: (index: number) => void
  clearCart: () => void
  cartTotal: number
  // products
  products: Product[]
  addProduct: (p: Omit<Product, "id">) => void
  updateProduct: (id: string, patch: Partial<Product>) => void
  deleteProduct: (id: string) => void
  // team
  team: TeamMember[]
  addTeamMember: (m: Omit<TeamMember, "id">) => void
  updateTeamMember: (id: string, patch: Partial<TeamMember>) => void
  deleteTeamMember: (id: string) => void
  // agreement
  agreement: string
  setAgreement: (text: string) => void
  // orders
  orders: Order[]
  createOrder: (info: CheckoutInfo) => Order
  setOrderStatus: (id: string, status: OrderStatus) => void
  // messages
  messages: ChatMessage[]
  sendMessage: (content: string, author?: string) => void
}

const StudioContext = createContext<StudioContextValue | null>(null)

let idCounter = 1000
const nextId = (prefix: string) => `${prefix}-${++idCounter}`

export function StudioProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"live" | "test">("live")
  const [user, setUser] = useState<StudioUser | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM)
  const [agreement, setAgreement] = useState<string>(INITIAL_AGREEMENT)
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)

  // Gerçek Discord oturumunu sayfa yüklendiğinde sunucudan çek (httpOnly cookie'ye dayanır).
  useEffect(() => {
    let cancelled = false
    fetch("/api/auth/session")
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data: { user: StudioUser | null }) => {
        if (!cancelled) setUser(data.user)
      })
      .catch(() => {
        if (!cancelled) setUser(null)
      })
      .finally(() => {
        if (!cancelled) setAuthLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Gerçek Discord OAuth akışını başlatır: tarayıcıyı Discord yetkilendirme sayfasına yönlendirir.
  const login = useCallback(() => {
    window.location.href = "/api/auth/discord"
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      setUser(null)
    }
  }, [])

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => [...prev, { productId: product.id, name: product.name, price: product.price }])
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart])

  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...p, id: nextId("prod") }])
  }, [])

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const addTeamMember = useCallback((m: Omit<TeamMember, "id">) => {
    setTeam((prev) => [...prev, { ...m, id: nextId("team") }])
  }, [])

  const updateTeamMember = useCallback((id: string, patch: Partial<TeamMember>) => {
    setTeam((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }, [])

  const deleteTeamMember = useCallback((id: string) => {
    setTeam((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const createOrder = useCallback(
    (info: CheckoutInfo) => {
      const order: Order = {
        id: nextId("ord"),
        createdAt: Date.now(),
        discordId: info.discordId,
        serverName: info.serverName,
        serverInvite: info.serverInvite,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        mode,
        status: "pending",
      }
      setOrders((prev) => [order, ...prev])
      setCart([])
      return order
    },
    [cart, mode],
  )

  const setOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }, [])

  const sendMessage = useCallback((content: string, author = "Owner") => {
    setMessages((prev) => [
      ...prev,
      {
        id: nextId("msg"),
        author,
        avatarColor: "oklch(0.64 0.26 300)",
        content,
        timestamp: Date.now(),
      },
    ])
  }, [])

  const isOwner = user?.discordId === OWNER_DISCORD_ID

  const value: StudioContextValue = {
    mode,
    setMode,
    user,
    isOwner,
    authLoading,
    login,
    logout,
    cart,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    team,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    agreement,
    setAgreement,
    orders,
    createOrder,
    setOrderStatus,
    messages,
    sendMessage,
  }

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
}

export function useStudio() {
  const ctx = useContext(StudioContext)
  if (!ctx) throw new Error("useStudio must be used within StudioProvider")
  return ctx
}

export { OWNER_DISCORD_ID, type CategoryId }
