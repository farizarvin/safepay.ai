"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import HeroSection from "@/components/hero-section"
import OnlinePaymentSection from "@/components/online-payment-section"
import FraudDashboardSection from "@/components/fraud-dashboard-section"
import Footer from "@/components/footer"

export default function HomePage() {
  const [showChatbot, setShowChatbot] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: "Beranda", href: "#hero" },
    { name: "Online Payment", href: "#online-payment" },
    { name: "Dashboard", href: "#fraud-dashboard" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0E1947] overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] left-[70%] top-[300px] sm:top-[400px] bg-[#FF5F31] opacity-50 sm:opacity-60 rounded-full blur-[120px] sm:blur-[180px] lg:blur-[250px] animate-pulse" />
        <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] left-[-80px] sm:left-[-120px] top-[800px] sm:top-[1000px] bg-[#FF5F31] opacity-50 sm:opacity-60 rounded-full blur-[120px] sm:blur-[180px] lg:blur-[250px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] left-[65%] top-[1600px] sm:top-[2000px] bg-[#FF5F31] opacity-50 sm:opacity-60 rounded-full blur-[120px] sm:blur-[180px] lg:blur-[250px] animate-pulse" />
        <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] left-[60%] top-[-80px] sm:top-[-120px] bg-[#EE4312] opacity-70 sm:opacity-80 rounded-full blur-[120px] sm:blur-[180px] lg:blur-[250px]" />
        <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] left-[-100px] sm:left-[-150px] top-[1200px] sm:top-[1600px] bg-[#EE4312] opacity-70 sm:opacity-80 rounded-full blur-[120px] sm:blur-[180px] lg:blur-[250px]" />
        <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] left-[-100px] sm:left-[-150px] top-[50px] bg-[#647EA0] opacity-70 sm:opacity-80 rounded-full blur-[120px] sm:blur-[180px] lg:blur-[250px]" />
        <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] left-[65%] top-[1000px] sm:top-[1400px] bg-[#647EA0] opacity-70 sm:opacity-80 rounded-full blur-[120px] sm:blur-[180px] lg:blur-[250px]" />
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute left-[-200px] top-[-300px] rotate-[30deg]">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0 h-[500px] lg:h-[700px] border-l-[1px] lg:border-l-[2px] border-[#FF5F31] animate-pulse"
              style={{
                left: `${i * 18}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 w-full h-16 sm:h-18 lg:h-20 shadow-[0px_4px_20px_5px_rgba(0,0,0,0.25)]
          transition-all duration-500 ease-in-out 
          ${isScrolled ? "bg-[#0E1947]/90 backdrop-blur-xl" : "bg-[#0E1947]"}
          hover:bg-[#0E1947]/95 hover:backdrop-blur-xl
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="flex items-center group cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#D9D9D9] tracking-[0.07em] group-hover:text-white transition-colors duration-300">
              SafePay.AI
            </h1>
            <div className="w-[24px] h-[4px] sm:w-[30px] sm:h-[6px] ml-2 mt-1 sm:mt-2 md:mt-3 bg-gradient-to-r from-[#EE4312] to-[#FF5F31] rounded-full group-hover:w-[30px] sm:group-hover:w-[40px] transition-all duration-300" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white font-semibold text-lg xl:text-xl tracking-[0.07em] hover:text-[#FF5F31] transition-all duration-300 hover:scale-105 relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5F31] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        navItems={navItems}
        onNavigate={scrollToSection}
      />

      {/* Sections */}
      <HeroSection onLearnMore={() => scrollToSection("#articles")} onTalkToSafy={() => scrollToSection("#chatbot")} />
      <FraudDashboardSection />
      <OnlinePaymentSection />
      <Footer />
    </div>
  )
}
