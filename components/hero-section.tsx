"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  onLearnMore: () => void
  onTalkToSafy: () => void
}

export default function HeroSection({ onLearnMore, onTalkToSafy }: HeroSectionProps) {
  return (
    <section id="hero" className="relative z-10 min-h-screen flex items-center pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-fade-in-up order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">
                Kenali Penipuan Online{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5F31] to-[#EE4312] block sm:inline">
                  Sebelum Terlambat
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Inovasi AI dalam Deteksi Fraud dan Money Laundering Menuju Ekonomi Digital Aman dan Berkelanjutan
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              {/* Button Prediksi */}
              <Button
                asChild
                className="w-full sm:w-auto bg-gradient-to-r from-[#EE4312] to-[#FF5F31] hover:from-[#FF5F31] hover:to-[#EE4312] text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group min-w-[200px]"
              >
                <Link href="/input-data/online-payment">
                  Prediksi
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Button Pelajari Lebih Lanjut */}
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border-2 border-[#FF5F31] text-[#FF5F31] hover:bg-[#FF5F31] hover:text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent min-w-[200px]"
              >
                <Link href="#fraud-dashboard">
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative flex justify-center order-1 lg:order-2 animate-fade-in-right">
            <div className="relative group">
              <div className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[220px] sm:h-[250px] md:h-[280px] lg:h-[320px] bg-gradient-to-br from-[#FF5F31] to-[#EE4312] rounded-2xl flex items-center justify-center relative z-10 group-hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <div className="text-white text-center p-6 lg:p-8">
                  {/* <Shield className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 lg:mb-6 animate-bounce" /> */}
                  <img
                    src="/logo.png"
                    alt="SafePay.AI Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 lg:mb-6 animate-bounce"
                  />
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">Fraud Prevention</h3>
                  <p className="text-base sm:text-lg lg:text-xl">AI-Powered Security System</p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-[#EE4312] rounded-2xl translate-x-[-12px] translate-y-[12px] group-hover:translate-x-[-16px] group-hover:translate-y-[16px] transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
