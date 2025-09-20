"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface FraudDetectionResult {
  model_type: string
  is_fraud: boolean
  fraud_probability: number
  confidence_level: string
  risk_score: string
  transaction_amount: number
  features_used: Record<string, string | number | boolean>
}

export default function OnlinePaymentInputPage() {
  const [formData, setFormData] = useState({
    transactionDate: "2025-01-01",
    transactionTime: "00:00",
    type: "",
    amount: "",
    oldbalanceOrg: "",
    newbalanceOrig: "",
    oldbalanceDest: "",
    newbalanceDest: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<FraudDetectionResult | null>(null)
  const [error, setError] = useState<string>("")

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const roundTime = (time: string) => {
    const [h, m] = time.split(":").map(Number)
    const hh = m >= 30 ? (h + 1) % 24 : h
    return `${hh.toString().padStart(2, "0")}:00`
  }

  const calculateStep = (date: string, time: string) => {
    const d = new Date(date)
    const day = d.getDate()
    const hour = Number(roundTime(time).split(":")[0])
    return (day - 1) * 24 + hour + 1
  }

  const validateStep = (step: number) => step >= 1 && step <= 744

  const formatReadableDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setResult(null)

    const step = calculateStep(formData.transactionDate, formData.transactionTime)
    if (!validateStep(step)) {
      setError(`Step (${step}) di luar range 1–744.`)
      setIsLoading(false)
      return
    }

    const payload = {
      step,
      type: formData.type,
      amount: parseFloat(formData.amount),
      oldbalanceOrg: parseFloat(formData.oldbalanceOrg),
      newbalanceOrig: parseFloat(formData.newbalanceOrig),
      oldbalanceDest: parseFloat(formData.oldbalanceDest),
      newbalanceDest: parseFloat(formData.newbalanceDest),
    }

    console.log("Data JSON yang dikirim ke backend:", payload)

    try {
      // Pastikan BACKEND_API_URL tidak diakhiri slash
      const base = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/+$/, "") || ""
      const res = await fetch(`${base}/predict/online-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP status ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saat request")
    } finally {
      setIsLoading(false)
    }
  }

  const rounded = roundTime(formData.transactionTime)
  const stepNow = calculateStep(formData.transactionDate, formData.transactionTime)
  const dayNow = new Date(formData.transactionDate).getDate()

  return (
    <div className="min-h-screen bg-white">
      <header className="shadow p-4 flex items-center justify-between">
        <Link href="/"><ArrowLeft /></Link>
        <h1 className="text-2xl font-bold text-[#FF5F31]">ONLINE PAYMENT CHECK</h1>
        <Link href="/">SafePay.AI</Link>
      </header>

      <main className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-600">❌ {error}</div>}

          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label>📅 Tanggal</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  value={formData.transactionDate}
                  onChange={e => handleInputChange("transactionDate", e.target.value)}
                  className="w-full pl-10 p-2 border rounded"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">{formatReadableDate(formData.transactionDate)}</p>
            </div>

            <div>
              <label>🕐 Jam</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="time"
                  value={formData.transactionTime}
                  onChange={e => handleInputChange("transactionTime", e.target.value)}
                  className="w-full pl-10 p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border p-4 rounded">
            <p>📊 Preview: Hari ke-{dayNow}, {formData.transactionTime} → {rounded}</p>
            <p>Step: {stepNow} { !validateStep(stepNow) && "(⚠️ Invalid)" }</p>
          </div>

          <div>
            <label>Type</label>
            <select
              value={formData.type}
              onChange={e => handleInputChange("type", e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Pilih jenis</option>
              <option value="PAYMENT">PAYMENT</option>
              <option value="TRANSFER">TRANSFER</option>
              <option value="CASH_OUT">CASH_OUT</option>
              <option value="CASH_IN">CASH_IN</option>
              <option value="DEBIT">DEBIT</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label>Amount</label>
              <Input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={e => handleInputChange("amount", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Old Balance Origin</label>
              <Input
                type="number"
                step="0.01"
                value={formData.oldbalanceOrg}
                onChange={e => handleInputChange("oldbalanceOrg", e.target.value)}
                required
              />
            </div>
            <div>
              <label>New Balance Origin</label>
              <Input
                type="number"
                step="0.01"
                value={formData.newbalanceOrig}
                onChange={e => handleInputChange("newbalanceOrig", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Old Balance Destination</label>
              <Input
                type="number"
                step="0.01"
                value={formData.oldbalanceDest}
                onChange={e => handleInputChange("oldbalanceDest", e.target.value)}
                required
              />
            </div>
            <div>
              <label>New Balance Destination</label>
              <Input
                type="number"
                step="0.01"
                value={formData.newbalanceDest}
                onChange={e => handleInputChange("newbalanceDest", e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-[#EE4312] to-[#FF5F31] text-white rounded">
            {isLoading ? "Loading..." : "ANALISIS KEAMANAN TRANSAKSI"}
          </Button>

          {/* ✅ SIMPLE RESULTS DISPLAY DENGAN "FRAUD"/"NOT FRAUD" */}
          {result && (
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-lg">
              <div className="text-center space-y-4">
                {/* Status dengan Icon */}
                <div
                  className={`text-6xl ${result.is_fraud ? "animate-pulse" : ""}`}
                >
                  {result.is_fraud ? "🚨" : "✅"}
                </div>

                {/* Status Text */}
                <h2
                  className={`text-2xl font-bold ${
                    result.is_fraud ? "text-red-800" : "text-green-800"
                  }`}
                >
                  {result.is_fraud
                    ? "FRAUD DETECTED"
                    : "LEGITIMATE TRANSACTION"}
                </h2>

                {/* ✅ TAMBAHAN: FRAUD/NOT FRAUD Text */}
                <div
                  className={`text-3xl font-bold ${
                    result.is_fraud ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {result.is_fraud ? "FRAUD" : "NOT FRAUD"}
                </div>

                {/* Risk Score Badge */}
                <div className="flex justify-center">
                  <span
                    className={`px-8 py-4 rounded-2xl text-xl font-bold shadow-lg ${
                      result.risk_score === "HIGH"
                        ? "bg-red-500 text-white"
                        : result.risk_score === "MEDIUM"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    Risk Score: {result.risk_score}
                  </span>
                </div>
                {/* ✅ Rekomendasi berdasarkan hasil */}
                <div className="mt-6 text-left">
                  <h3 className="text-lg font-semibold text-[#373642] mb-2">
                    Rekomendasi:
                  </h3>
                  {result.is_fraud ? (
                    <ul className="list-disc pl-5 space-y-1 text-red-700">
                      <li>
                        Transaksi mencurigakan terdeteksi — hentikan proses
                        transfer segera.
                      </li>
                      <li>
                        Hubungi layanan pelanggan untuk membekukan akun
                        sementara.
                      </li>
                      <li>
                        Jangan lakukan transaksi lanjutan hingga mendapatkan
                        klarifikasi dari bank.
                      </li>
                      <li>
                        Hubungi Pihak berwarjib untuk pengamanan lebih lanjut.
                      </li>
                    </ul>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1 text-green-700">
                      <li>Transaksi online Anda aman dan berhasil diproses.</li>
                      <li>
                        Pastikan koneksi internet Anda tetap aman saat
                        transaksi.
                      </li>
                      <li>
                        Hindari membagikan detail rekening kepada pihak yang
                        tidak dikenal.
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
)
}
