"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function OnlinePaymentInputPage() {
  const [formData, setFormData] = useState({
    transactionDate: "2025-01-01", // Format YYYY-MM-DD
    transactionTime: "00:00", // Format HH:MM (fleksibel dengan menit)
    type: "",
    amount: "",
    isFraud: "",
    oldbalanceOrg: "",
    newbalanceOrig: "",
    oldbalanceDest: "",
    newbalanceDest: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Fungsi untuk membulatkan waktu berdasarkan aturan:
  // >= 30 menit = jam berikutnya (01:00)
  // < 30 menit = jam sekarang (00:00)
  const roundTime = (timeString: string): { originalHour: number, originalMinute: number, roundedHour: number, roundedTime: string } => {
    const [hours, minutes] = timeString.split(':').map(Number)
    
    if (minutes >= 30) {
      // Bulatkan ke jam berikutnya
      const nextHour = (hours + 1) % 24
      return {
        originalHour: hours,
        originalMinute: minutes,
        roundedHour: nextHour,
        roundedTime: `${nextHour.toString().padStart(2, '0')}:00`
      }
    } else {
      // Bulatkan ke jam sekarang
      return {
        originalHour: hours,
        originalMinute: minutes,
        roundedHour: hours,
        roundedTime: `${hours.toString().padStart(2, '0')}:00`
      }
    }
  }

  // Fungsi untuk menghitung step berdasarkan tanggal dan jam yang sudah dibulatkan
  const calculateStep = (dateString: string, timeString: string): number => {
    const date = new Date(dateString)
    const day = date.getDate()
    const roundedTime = roundTime(timeString)
    const hour = roundedTime.roundedHour
    
    // Rumus: step = (day - 1) * 24 + hour + 1
    const step = (day - 1) * 24 + hour + 1
    return step
  }

  // Fungsi untuk validasi step
  const validateStep = (step: number): boolean => {
    return step >= 1 && step <= 744 // Range valid: 1-744
  }

  // Fungsi untuk format tanggal yang readable
  const formatReadableDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('id-ID', options)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Bulatkan waktu sebelum menghitung step
    const roundedTimeInfo = roundTime(formData.transactionTime)
    const calculatedStep = calculateStep(formData.transactionDate, formData.transactionTime)
    
    // Validasi step
    if (!validateStep(calculatedStep)) {
      console.error("❌ Step tidak valid:", calculatedStep)
      alert(`Step yang dihitung (${calculatedStep}) di luar range valid (1-744). Silakan pilih tanggal dan jam yang sesuai.`)
      return
    }
    
    // Parse tanggal untuk debugging
    const date = new Date(formData.transactionDate)
    const day = date.getDate()
    
    // Siapkan data untuk backend (step sudah dikonversi dengan waktu yang dibulatkan)
    const dataForBackend = {
      step: calculatedStep, // Step yang sudah dihitung berdasarkan waktu yang dibulatkan
      type: formData.type,
      amount: parseFloat(formData.amount),
      isFraud: parseInt(formData.isFraud),
      oldbalanceOrg: parseFloat(formData.oldbalanceOrg),
      newbalanceOrig: parseFloat(formData.newbalanceOrig),
      oldbalanceDest: parseFloat(formData.oldbalanceDest),
      newbalanceDest: parseFloat(formData.newbalanceDest),
      // Info tambahan untuk debugging
      originalTime: formData.transactionTime,
      roundedTime: roundedTimeInfo.roundedTime,
    }
    
    // Console log untuk debugging
    console.log("=== DEBUGGING INFO ===")
    console.log("📅 Input Tanggal:", formData.transactionDate)
    console.log("🕐 Input Jam (Original):", formData.transactionTime)
    console.log("📅 Tanggal Readable:", formatReadableDate(formData.transactionDate))
    console.log("📊 Hari dari tanggal:", day)
    console.log("--- PROSES PEMBULATAN ---")
    console.log("🕐 Jam Original:", roundedTimeInfo.originalHour, "Menit:", roundedTimeInfo.originalMinute)
    console.log("⚡ Logika Pembulatan:", roundedTimeInfo.originalMinute >= 30 ? 
      `Menit ${roundedTimeInfo.originalMinute} >= 30, bulatkan ke jam berikutnya` : 
      `Menit ${roundedTimeInfo.originalMinute} < 30, bulatkan ke jam sekarang`)
    console.log("🕐 Jam Setelah Pembulatan:", roundedTimeInfo.roundedHour)
    console.log("🕐 Waktu Final untuk Step:", roundedTimeInfo.roundedTime)
    console.log("--- PERHITUNGAN STEP ---")
    console.log("📐 Rumus Step: (", day, "- 1) × 24 +", roundedTimeInfo.roundedHour, "+ 1")
    console.log("📐 Perhitungan: (", day - 1, ") × 24 +", roundedTimeInfo.roundedHour, "+ 1 =", calculatedStep)
    console.log("✅ Step yang dihitung:", calculatedStep)
    console.log("📊 Data untuk Backend:", dataForBackend)
    console.log("===================")
    
    // Here you would typically send the data to your API
    console.log("🚀 Data siap dikirim ke backend!")
  }

  // Hitung step dan pembulatan real-time untuk preview
  const currentRoundedTime = roundTime(formData.transactionTime)
  const currentStep = calculateStep(formData.transactionDate, formData.transactionTime)
  const currentDate = new Date(formData.transactionDate)
  const currentDay = currentDate.getDate()

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
              ONLINE PAYMENT CHECK
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
          
          {/* Waktu Transaksi (Tanggal dan Jam) */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Waktu Transaksi
                </label>
                
                {/* Input Tanggal dan Jam */}
                <div className="space-y-4">
                  {/* Input Tanggal dengan Icon Kiri */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      📅 Tanggal Transaksi
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={formData.transactionDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          handleInputChange("transactionDate", e.target.value)
                        }
                        className="w-full h-[45px] pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 text-base focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
                        style={{ fontFamily: "Inter, sans-serif" }}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatReadableDate(formData.transactionDate)}
                    </p>
                  </div>
                  
                  {/* Input Jam dengan Time Input (Fleksibel dengan Menit) */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      🕐 Jam Transaksi (Fleksibel)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        value={formData.transactionTime}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          handleInputChange("transactionTime", e.target.value)
                        }
                        className="w-full h-[45px] pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 text-base focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
                        style={{ fontFamily: "Inter, sans-serif" }}
                        required
                      />
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                      <p className="text-xs text-yellow-700 flex items-center">
                        <span className="mr-1">⚡</span>
                        <strong>Auto Pembulatan:</strong> 
                        <span className="ml-1">
                          {formData.transactionTime} → <strong>{currentRoundedTime.roundedTime}</strong>
                        </span>
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        {currentRoundedTime.originalMinute >= 30 ? 
                          `Menit ${currentRoundedTime.originalMinute} ≥ 30, dibulatkan ke jam berikutnya` :
                          `Menit ${currentRoundedTime.originalMinute} < 30, dibulatkan ke jam sekarang`
                        }
                      </p>
                    </div>
                  </div>
                  
                  {/* Preview Step dengan Design Baru */}
                  <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -mt-10 -mr-10 opacity-50"></div>
                    <div className="relative">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <h4 className="text-sm font-bold text-blue-800">Real-time Step Preview</h4>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="bg-white/70 rounded-lg p-2">
                          <p className="text-xs text-blue-600 font-medium">Hari ke-</p>
                          <p className="text-lg font-bold text-blue-900">{currentDay}</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2">
                          <p className="text-xs text-blue-600 font-medium">Input</p>
                          <p className="text-sm font-bold text-blue-900">{formData.transactionTime}</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2">
                          <p className="text-xs text-blue-600 font-medium">Dibulatkan</p>
                          <p className="text-sm font-bold text-green-900">{currentRoundedTime.roundedTime}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/80 rounded-lg p-3 border border-blue-200">
                        <p className="text-sm text-blue-800 mb-1">
                          📊 <strong>Step yang dihitung:</strong> 
                          <span className="text-xl font-bold text-blue-900 ml-2">{currentStep}</span>
                        </p>
                        <p className="text-xs text-blue-600">
                          Rumus: ({currentDay} - 1) × 24 + {currentRoundedTime.roundedHour} + 1 = <strong>{currentStep}</strong>
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Menggunakan jam yang sudah dibulatkan: <strong>{currentRoundedTime.roundedTime}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-l-4 border-[#FF5F31]">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <span className="text-lg mr-2">ℹ️</span>
                    Tentang Step & Pembulatan Waktu
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <strong className="text-[#FF5F31]">📐 Formula Step:</strong>
                      <br />
                      <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">
                        Step = (Hari - 1) × 24 + Jam_Dibulatkan + 1
                      </code>
                    </div>
                    
                    <div>
                      <strong className="text-[#FF5F31]">⏰ Sistem Pembulatan Otomatis:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                        <li><strong>Menit ≥ 30:</strong> Bulatkan ke jam berikutnya</li>
                        <li><strong>Menit &lt; 30:</strong> Bulatkan ke jam sekarang</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/60 rounded-lg p-3 border border-orange-200">
                      <p className="text-xs text-gray-600 font-medium mb-2">💡 <strong>Contoh Pembulatan:</strong></p>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div>• 14:45 → <strong>15:00</strong> (menit 45 ≥ 30)</div>
                        <div>• 14:29 → <strong>14:00</strong> (menit 29 &lt; 30)</div>
                        <div>• 23:30 → <strong>00:00</strong> (jam 24 = jam 0)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Type */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Type (Jenis Transaksi)
                </label>
                <select
                  value={formData.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange("type", e.target.value)}
                  className="w-full h-[45px] bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                >
                  <option value="">Pilih jenis transaksi</option>
                  <option value="PAYMENT">PAYMENT - Pembayaran</option>
                  <option value="TRANSFER">TRANSFER - Transfer</option>
                  <option value="CASH_OUT">CASH_OUT - Penarikan Tunai</option>
                  <option value="CASH_IN">CASH_IN - Setoran Tunai</option>
                  <option value="DEBIT">DEBIT - Debit</option>
                </select>
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Jenis transaksi yang dilakukan. Setiap jenis memiliki pola dan risiko penipuan yang berbeda-beda.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

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
                  value={formData.amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("amount", e.target.value)}
                  className="w-full h-[45px] bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base placeholder:text-gray-500 focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Jumlah uang yang ditransaksikan. Nilai yang tidak biasa atau terlalu besar dapat mengindikasikan
                  aktivitas penipuan.
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
                  value={formData.isFraud}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange("isFraud", e.target.value)}
                  className="w-full h-[45px] bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
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
                  Status apakah transaksi ini merupakan penipuan atau tidak. Digunakan untuk validasi dan training model
                  deteksi fraud.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Old Balance Origin */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Old Balance Origin (Saldo Awal Pengirim)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Saldo sebelum transaksi"
                  value={formData.oldbalanceOrg}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("oldbalanceOrg", e.target.value)
                  }
                  className="w-full h-[45px] bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base placeholder:text-gray-500 focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Saldo rekening pengirim sebelum transaksi dilakukan. Membantu menganalisis pola perubahan saldo yang
                  tidak wajar.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* New Balance Origin */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  New Balance Origin (Saldo Akhir Pengirim)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Saldo setelah transaksi"
                  value={formData.newbalanceOrig}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("newbalanceOrig", e.target.value)
                  }
                  className="w-full h-[45px] bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base placeholder:text-gray-500 focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Saldo rekening pengirim setelah transaksi selesai. Digunakan untuk memverifikasi konsistensi
                  perhitungan saldo.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Old Balance Destination */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Old Balance Destination (Saldo Awal Penerima)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Saldo penerima sebelum transaksi"
                  value={formData.oldbalanceDest}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("oldbalanceDest", e.target.value)
                  }
                  className="w-full h-[45px] bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base placeholder:text-gray-500 focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Saldo rekening penerima sebelum menerima transaksi. Membantu mengidentifikasi pola penerimaan yang
                  tidak biasa.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* New Balance Destination */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
              <div className="flex-1 lg:max-w-md">
                <label
                  className="block text-black text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  New Balance Destination (Saldo Akhir Penerima)
                </label>
                <Input
                  type="number"
                  step="0.01" 
                  placeholder="Saldo penerima setelah transaksi"
                  value={formData.newbalanceDest}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("newbalanceDest", e.target.value)
                  }
                  className="w-full h-[45px] bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base placeholder:text-gray-500 focus:border-[#FF5F31] focus:ring-4 focus:ring-[#FF5F31]/20 transition-all duration-300 hover:border-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-[#7D7D7D] text-sm sm:text-base leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Saldo rekening penerima setelah menerima transaksi. Digunakan untuk memverifikasi konsistensi dan
                  mendeteksi anomali saldo.
                </p>
              </div>
            </div>
            <hr className="border-[#7D7D7D] opacity-30" />
          </div>

          {/* Submit Button */}
          <div className="pt-8 sm:pt-12 lg:pt-16">
            <Button
              type="submit"
              className="w-full h-[50px] bg-gradient-to-r from-[#EE4312] to-[#FF5F31] hover:from-[#FF5F31] hover:to-[#EE4312] rounded-full text-white font-semibold text-base sm:text-lg lg:text-xl tracking-[0.07em] transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              ANALISIS KEAMANAN TRANSAKSI
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
