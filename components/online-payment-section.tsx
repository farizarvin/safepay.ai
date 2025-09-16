import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export default function OnlinePaymentSection() {
  return (
    <section id="online-payment" className="relative z-10 min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-in-left">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Online Payment Fraud
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold italic leading-tight text-white/90">
                Risiko Penipuan dalam Pembayaran Online
              </p>
            </div>

            {/* Statistics */}
            <div className="bg-transparent border-2 border-[#EE4312] rounded-2xl p-6 sm:p-8 relative group hover:border-[#FF5F31] transition-colors duration-300">
              <div className="absolute inset-0 border-2 border-[#EE4312] rounded-2xl translate-x-[8px] translate-y-[-8px] group-hover:border-[#FF5F31] transition-colors duration-300"></div>
              <div className="relative z-10 space-y-6">
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#FF5F31] rounded-lg px-4 py-2 inline-block mb-3 hover:bg-[#EE4312] transition-colors">
                    <span className="text-white text-sm font-medium">Statista mencatat</span>
                  </div>
                  <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight">
                    30% pengguna online melaporkan penipuan saat transaksi
                  </p>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#FF5F31] rounded-lg px-4 py-2 inline-block mb-3 hover:bg-[#EE4312] transition-colors">
                    <span className="text-white text-sm font-medium">OJK mencatat</span>
                  </div>
                  <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight">
                    40.000+ pengaduan penipuan online tercatat setiap tahun
                  </p>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#FF5F31] rounded-lg px-4 py-2 inline-block mb-3 hover:bg-[#EE4312] transition-colors">
                    <span className="text-white text-sm font-medium">APWG mencatat</span>
                  </div>
                  <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight">
                    60% peningkatan serangan phishing terkait pembayaran online
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link href="/input-data/online-payment">
                <Button className="w-full sm:w-auto sm:min-w-[320px] lg:min-w-[400px] h-[55px] bg-gradient-to-r from-[#EE4312] to-[#FF5F31] hover:from-[#FF5F31] hover:to-[#EE4312] rounded-full text-white font-semibold text-lg tracking-[0.07em] transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  Prediksi
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative flex justify-center animate-fade-in-right">
            <div className="relative group">
              <div className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] bg-gradient-to-br from-[#FF5F31] to-[#EE4312] rounded-2xl flex items-center justify-center relative z-10 group-hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <div className="text-white text-center p-8">
                  <Phone className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">Online Payment</h3>
                  <p className="text-base sm:text-lg">Secure Transactions</p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-[#EE4312] rounded-2xl translate-x-[12px] translate-y-[12px] group-hover:translate-x-[16px] group-hover:translate-y-[16px] transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
