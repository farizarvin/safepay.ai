"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CreditCardInputPage() {
  const [formData, setFormData] = useState({
    amt: "",
    lat: "",
    long: "",
    city_pop: "",
    merch_lat: "",
    merch_long: "",
    is_fraud: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Credit Card Form submitted:", formData)
    // Here you would typically send the data to your API
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header - Responsive */}
      <div className="w-full h-[100px] sm:h-[120px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.25)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between max-w-7xl">
          <div className="flex items-center">
            <Link href="/" className="mr-4 sm:mr-6 hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                <ArrowLeft className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#0E1947] stroke-[3px] sm:stroke-[4px] hover:text-[#FF5F31] transition-colors" />
              </div>
            </Link>
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-[#FF5F31]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              CREDIT CARD CHECK
            </h1>
          </div>
          <Link href="/" className="hover:scale-105 transition-transform duration-300">
            <div className="flex items-center cursor-pointer group">
              <h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-[#373642] tracking-[0.07em] group-hover:text-[#FF5F31] transition-colors"
                style={{ fontFamily: "Protest Guerrilla, cursive" }}
              >
                SafePay.AI
              </h2>
              <div className="w-[20px] h-[4px] sm:w-[25px] sm:h-[5px] lg:w-[30px] lg:h-[6px] ml-2 mt-2 sm:mt-3 bg-gradient-to-r from-[#EE4312] to-[#FF5F31] rounded-full group-hover:w-[25px] sm:group-hover:w-[35px] lg:group-hover:w-[40px] transition-all duration-300" />
            </div>
          </Link>
        </div>
      </div>

      {/* Form Content - Fully Responsive */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {/* Amount */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Amount (Jumlah Transaksi)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Masukkan jumlah transaksi"
                  value={formData.amt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("amt", e.target.value)}
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Masukkan jumlah transaksi dalam mata uang yang sesuai. Nilai ini akan dianalisis untuk mendeteksi pola
                  transaksi yang tidak biasa.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Latitude */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Latitude (Lintang)
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Contoh: -6.200000"
                  value={formData.lat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("lat", e.target.value)}
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Koordinat lintang lokasi transaksi. Informasi geografis membantu mengidentifikasi pola transaksi
                  berdasarkan lokasi.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Longitude */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Longitude (Bujur)
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Contoh: 106.816666"
                  value={formData.long}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("long", e.target.value)}
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Koordinat bujur lokasi transaksi. Bersama dengan latitude, memberikan posisi geografis yang akurat
                  untuk analisis.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* City Population */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  City Population (Populasi Kota)
                </label>
                <Input
                  type="number"
                  placeholder="Contoh: 10000000"
                  value={formData.city_pop}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("city_pop", e.target.value)}
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Jumlah populasi kota tempat transaksi dilakukan. Data demografis ini membantu menganalisis pola
                  transaksi berdasarkan kepadatan penduduk.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Merchant Latitude */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Merchant Latitude (Lintang Merchant)
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Contoh: -6.175000"
                  value={formData.merch_lat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("merch_lat", e.target.value)}
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Koordinat lintang lokasi merchant. Digunakan untuk menghitung jarak antara lokasi pengguna dan
                  merchant untuk deteksi anomali.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Merchant Longitude */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Merchant Longitude (Bujur Merchant)
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Contoh: 106.865000"
                  value={formData.merch_long}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("merch_long", e.target.value)}
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base placeholder:text-[#7D7D7D]/50 focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Koordinat bujur lokasi merchant. Bersama dengan merchant latitude, menentukan posisi geografis
                  merchant untuk analisis jarak.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Is Fraud */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Is Fraud (Status Penipuan)
                </label>
                <select
                  value={formData.is_fraud}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange("is_fraud", e.target.value)}
                  className="w-full h-[35px] sm:h-[40px] bg-white/50 border border-[#7D7D7D] rounded-[5px] text-[#7D7D7D] text-sm sm:text-base focus:border-[#FF5F31] focus:ring-2 focus:ring-[#FF5F31]/20 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                >
                  <option value="">Pilih status</option>
                  <option value="0">0 - Bukan Penipuan</option>
                  <option value="1">1 - Penipuan</option>
                </select>
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Status apakah transaksi ini merupakan penipuan atau tidak. Digunakan untuk training model dan validasi
                  hasil prediksi sistem.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Submit Button */}
          <div className="pt-8 sm:pt-12 lg:pt-16">
            <Button
              type="submit"
              className="w-full h-[45px] sm:h-[50px] bg-gradient-to-r from-[#EE4312] to-[#FF5F31] hover:from-[#FF5F31] hover:to-[#EE4312] rounded-full text-white font-semibold text-base sm:text-lg lg:text-xl tracking-[0.07em] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              ANALISIS RISIKO KARTU KREDIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
