"use client"
import { X } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: { name: string; href: string }[]
  onNavigate: (href: string) => void
}

export default function MobileMenu({ isOpen, onClose, navItems, onNavigate }: MobileMenuProps) {
  const handleNavigate = (href: string) => {
    onNavigate(href)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0E1947] shadow-2xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button onClick={onClose} className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-6">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigate(item.href)}
                  className="w-full text-left py-3 px-4 text-white font-semibold text-lg hover:bg-[#FF5F31] hover:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
