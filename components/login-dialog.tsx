"use client"

import { Modal } from "./modal"
import { DiscordIcon } from "./icons"
import { useStudio } from "@/lib/studio-context"

export function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login } = useStudio()

  const handleLogin = () => {
    // Tarayıcıyı gerçek Discord OAuth2 yetkilendirme akışına yönlendirir.
    // Kullanıcı Discord üzerinde onay verdikten sonra /api/auth/discord/callback
    // ile sitemize geri döner ve gerçek Discord kimliğiyle oturum açılır.
    login()
  }

  return (
    <Modal open={open} onClose={onClose} title="Discord ile Giriş Yap">
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        Devam etmek için Discord hesabınla giriş yapman gerekiyor. &quot;Discord ile Devam Et&quot; butonuna
        tıkladığında Discord&apos;un resmi yetkilendirme sayfasına yönlendirileceksin. Kefix Studio hesabına
        veya şifrene erişemez; yalnızca Discord kullanıcı ID&apos;ni ve kullanıcı adını doğrulamak için izin
        ister.
      </p>

      <button
        type="button"
        onClick={handleLogin}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <DiscordIcon className="size-4" />
        Discord ile Devam Et
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Owner paneline erişim, giriş yapan Discord hesabının ID&apos;sine göre otomatik olarak belirlenir.
      </p>
    </Modal>
  )
}
