// @ts-nocheck

import { TopBanner } from "@/components/common/layout/banner"
import { Navbar } from "@/components/common/layout/navbar"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBanner />
      <Navbar />
    </header>
  )
}
