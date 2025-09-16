import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10">
      {/* Visual Separator/Divider */}
      <div className="border-t-2 border-white/20 bg-gradient-to-r from-[#EE4312]/10 via-[#FF5F31]/10 to-[#EE4312]/10"></div>
      
      {/* Footer Content with distinct background and shadow */}
      <div className="bg-[#0E1947] text-white shadow-2xl border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            
            {/* Brand & About */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white border-b border-[#FF5F31] pb-2 inline-block">
                SafePay.AI
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Platform AI untuk deteksi penipuan transaksi digital dengan teknologi terdepan.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white border-b border-[#FF5F31] pb-2 inline-block">
                Contact
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-[#FF5F31]" />
                  <span>Universitas Dian Nuswantoro, Semarang</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0 text-[#FF5F31]" />
                  <span>+62 0812 3456 7890</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0 text-[#FF5F31]" />
                  <span>support@safepay.ai</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white border-b border-[#FF5F31] pb-2 inline-block">
                Quick Links
              </h3>
              <div className="flex flex-col space-y-1 text-sm">
                <a href="#" className="text-white/80 hover:text-[#FF5F31] transition-colors duration-200 hover:translate-x-1">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/80 hover:text-[#FF5F31] transition-colors duration-200 hover:translate-x-1">
                  Terms of Service
                </a>
                <a href="#" className="text-white/80 hover:text-[#FF5F31] transition-colors duration-200 hover:translate-x-1">
                  FAQ
                </a>
                <a href="#" className="text-white/80 hover:text-[#FF5F31] transition-colors duration-200 hover:translate-x-1">
                  Support
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Separator */}
          <div className="mt-6 pt-4 border-t-2 border-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Copyright & Social Media with additional visual separation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-[#0A1235] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 rounded-t-lg">
            <p className="text-white/70 text-xs sm:text-sm">
              © 2025 SafePay.AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-xs">Follow us:</span>
              <div className="flex gap-3 text-xs">
                <a href="#" className="text-white/60 hover:text-[#FF5F31] transition-colors duration-200 hover:scale-110">
                  LinkedIn
                </a>
                <a href="#" className="text-white/60 hover:text-[#FF5F31] transition-colors duration-200 hover:scale-110">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
