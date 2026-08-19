import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Catalog } from "@/components/catalog"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
