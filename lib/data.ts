export type CategoryId = "fivem" | "discord-bot" | "advertising"

export type Product = {
  id: string
  category: CategoryId
  name: string
  description: string
  price: number
  features: string[]
  popular?: boolean
}

export type Category = {
  id: CategoryId
  name: string
  tagline: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  discord: string
}

export type OrderStatus = "pending" | "fulfilled" | "unreachable"

export type Order = {
  id: string
  createdAt: number
  discordId: string
  serverName: string
  serverInvite: string
  items: { productId: string; name: string; price: number }[]
  total: number
  mode: "live" | "test"
  status: OrderStatus
}

export type ChatMessage = {
  id: string
  author: string
  avatarColor: string
  content: string
  timestamp: number
}

export const OWNER_DISCORD_ID = "1416853377517883476"
export const DISCORD_INVITE = "https://discord.gg/kefixstudio"

export const CATEGORIES: Category[] = [
  {
    id: "fivem",
    name: "FiveM Sistemleri",
    tagline: "Optimize edilmiş, esnek ve tamamen özelleştirilebilir sunucu altyapıları.",
  },
  {
    id: "discord-bot",
    name: "Özel Discord Botları",
    tagline: "Topluluğunu büyüten, ihtiyacına göre kodlanmış akıllı botlar.",
  },
  {
    id: "advertising",
    name: "Reklam & Ek Hizmetler",
    tagline: "Görünürlüğünü artıran tanıtım paketleri ve ekstra destek çözümleri.",
  },
]

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "fivem-core",
    category: "fivem",
    name: "FiveM Core Sistem",
    description: "Roleplay sunucular için temel framework kurulumu ve optimizasyon.",
    price: 1499,
    features: ["ESX / QBCore kurulumu", "Optimize edilmiş kaynaklar", "Temel HUD & UI", "7 gün destek"],
  },
  {
    id: "fivem-pro",
    category: "fivem",
    name: "FiveM Pro Paket",
    description: "Gelişmiş job, ekonomi ve özel UI sistemleriyle tam donanımlı paket.",
    price: 3299,
    features: ["Özel meslek sistemleri", "Gelişmiş ekonomi", "Tamamen özel UI/UX", "30 gün destek", "Anti-cheat entegrasyonu"],
    popular: true,
  },
  {
    id: "fivem-custom",
    category: "fivem",
    name: "FiveM Özel Script",
    description: "İhtiyacına özel, sıfırdan yazılan tekil script geliştirmesi.",
    price: 899,
    features: ["Sıfırdan geliştirme", "Kaynak kodu teslimi", "Dökümantasyon", "Revizyon hakkı"],
  },
  {
    id: "bot-basic",
    category: "discord-bot",
    name: "Temel Discord Botu",
    description: "Moderasyon, karşılama ve rol yönetimi içeren hafif bot.",
    price: 649,
    features: ["Moderasyon komutları", "Otomatik rol & karşılama", "Log sistemi", "7/24 hosting rehberi"],
  },
  {
    id: "bot-advanced",
    category: "discord-bot",
    name: "Gelişmiş Ticket & Ekonomi Botu",
    description: "Ticket, ekonomi ve özel panel entegrasyonlu premium bot.",
    price: 1299,
    features: ["Ticket sistemi", "Ekonomi & seviye", "Web panel entegrasyonu", "Özel komut seti", "30 gün destek"],
    popular: true,
  },
  {
    id: "bot-ai",
    category: "discord-bot",
    name: "Yapay Zeka Destekli Bot",
    description: "Yapay zeka sohbet ve otomasyon yeteneklerine sahip özel bot.",
    price: 2199,
    features: ["AI sohbet entegrasyonu", "Otomasyon akışları", "Özel eğitim promptları", "API entegrasyonları"],
  },
  {
    id: "ad-starter",
    category: "advertising",
    name: "Tanıtım Başlangıç Paketi",
    description: "Sunucunu duyuran temel reklam ve sosyal medya paketi.",
    price: 399,
    features: ["Sosyal medya tanıtımı", "Banner tasarımı", "Discord duyuru desteği"],
  },
  {
    id: "ad-boost",
    category: "advertising",
    name: "Boost & Görünürlük Paketi",
    description: "Daha geniş kitleye ulaşmak için güçlendirilmiş reklam kampanyası.",
    price: 899,
    features: ["Hedefli reklam kampanyası", "Grafik & video içerik", "Öne çıkarma", "Haftalık rapor"],
    popular: true,
  },
  {
    id: "ad-support",
    category: "advertising",
    name: "Ek Destek Hizmeti",
    description: "Sunucun için sürekli teknik bakım ve danışmanlık desteği.",
    price: 549,
    features: ["Aylık teknik bakım", "Öncelikli destek", "Danışmanlık", "Performans takibi"],
  },
]

export const INITIAL_TEAM: TeamMember[] = [
  { id: "t1", name: "Kefix", role: "Kurucu & Baş Geliştirici", discord: "kefix" },
  { id: "t2", name: "Nova", role: "FiveM Sistem Uzmanı", discord: "nova.dev" },
  { id: "t3", name: "Byte", role: "Discord Bot Geliştirici", discord: "byte.code" },
  { id: "t4", name: "Aura", role: "Tasarım & Reklam", discord: "aura.design" },
]

export const INITIAL_AGREEMENT = `KEFIX STUDIO SATIN ALIM SÖZLEŞMESİ

1. GENEL HÜKÜMLER
Bu sözleşme, Kefix Studio ("Sağlayıcı") ile hizmet satın alan müşteri ("Alıcı") arasında düzenlenmiştir. Alıcı, satın alma işlemini tamamlayarak bu sözleşmenin tüm maddelerini okuduğunu ve kabul ettiğini beyan eder.

2. HİZMET KAPSAMI
Satın alınan paketin kapsamı, ürün açıklamasında belirtilen özelliklerle sınırlıdır. Ek talepler ayrı ücretlendirmeye tabidir.

3. TESLİMAT
Hizmetler, ödeme onayından sonra Alıcının belirttiği Discord ID ve sunucu bilgileri üzerinden sağlanır. Alıcı, doğru ve güncel bilgi vermekle yükümlüdür.

4. İADE VE İPTAL
Dijital hizmetlerde teslimat başladıktan sonra iade yapılmaz. Hizmet başlamadan önce yapılan iptallerde iade koşulları Sağlayıcının inisiyatifindedir.

5. SORUMLULUK
Alıcının yanlış bilgi vermesi veya iletişime geçilememesi durumunda oluşacak gecikmelerden Sağlayıcı sorumlu tutulamaz.

6. İLETİŞİM
Tüm iletişim discord.gg/kefixstudio üzerinden sağlanır. Satın alma sonrası 30 saat içinde iletişime geçilmesi esastır.`

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-901",
    createdAt: Date.now() - 1000 * 60 * 60 * 31,
    discordId: "204583910284759012",
    serverName: "Vortex Roleplay",
    serverInvite: "https://discord.gg/vortexrp",
    items: [{ productId: "fivem-pro", name: "FiveM Pro Paket", price: 3299 }],
    total: 3299,
    mode: "live",
    status: "pending",
  },
  {
    id: "ord-902",
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
    discordId: "889123774512009876",
    serverName: "NovaMC Community",
    serverInvite: "https://discord.gg/novamc",
    items: [{ productId: "bot-advanced", name: "Gelişmiş Ticket & Ekonomi Botu", price: 1299 }],
    total: 1299,
    mode: "live",
    status: "pending",
  },
  {
    id: "ord-903",
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
    discordId: "553120945873001122",
    serverName: "Test Sunucusu",
    serverInvite: "https://discord.gg/testsrv",
    items: [{ productId: "ad-boost", name: "Boost & Görünürlük Paketi", price: 899 }],
    total: 899,
    mode: "test",
    status: "fulfilled",
  },
]

export const INITIAL_MESSAGES: ChatMessage[] = [
  { id: "m1", author: "Kefix", avatarColor: "oklch(0.64 0.26 300)", content: "Yeni FiveM Pro paketimiz yayında!", timestamp: Date.now() - 1000 * 60 * 42 },
  { id: "m2", author: "Nova", avatarColor: "oklch(0.6 0.2 200)", content: "Optimizasyon güncellemesi tamamlandı.", timestamp: Date.now() - 1000 * 60 * 30 },
  { id: "m3", author: "Byte", avatarColor: "oklch(0.7 0.18 145)", content: "Yeni ticket botu test aşamasında.", timestamp: Date.now() - 1000 * 60 * 12 },
  { id: "m4", author: "Aura", avatarColor: "oklch(0.75 0.18 330)", content: "Reklam kampanyası bannerları hazır.", timestamp: Date.now() - 1000 * 60 * 3 },
]

export function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value)
}
