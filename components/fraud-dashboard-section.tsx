"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp, AlertTriangle, Target, ArrowRight, BarChart3, Brain, Shield, Activity, ChevronDown } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts"
import Link from "next/link"

// Data real dari attachment
const fraudTrendData = [
  { year: "2020", cases: 1409, losses: 75 },
  { year: "2021", cases: 1000, losses: 100 },
  { year: "2022", cases: 1200, losses: 120 },
  { year: "2023", cases: 1247, losses: 150 },
  { year: "2024", cases: 5111, losses: 500 },
  { year: "2025", cases: 14496, losses: 2600 },
]

// Data Feature Importance sesuai gambar yang dikirim user
const featureImportanceData = [
  {
    feature: "newbalanceOrig",
    importance: 0.440,
    label: "newbalanceOrig",
    color: "#C41E3A" // Merah tua
  },
  {
    feature: "oldbalanceOrg",
    importance: 0.190,
    label: "oldbalanceOrg",
    color: "#90EE90" // Hijau muda
  },
  {
    feature: "type",
    importance: 0.180,
    label: "type",
    color: "#B0E0E6" // Biru pucat
  },
  {
    feature: "amount",
    importance: 0.150,
    label: "amount",
    color: "#87CEEB" // Biru muda
  },
  {
    feature: "newbalanceDest",
    importance: 0.040,
    label: "newbalanceDest",
    color: "#4682B4" // Biru sedang
  },
  {
    feature: "step",
    importance: 0.003,
    label: "step",
    color: "#191970" // Biru tua
  },
  {
    feature: "oldbalanceDest",
    importance: 0.002,
    label: "oldbalanceDest",
    color: "#191970" // Biru tua
  },
]

// Data feature dengan detail insight untuk dropdown
const featureDetails = [
  {
    key: 'newbalanceOrig',
    icon: '📊',
    label: 'NewbalanceOrig',
    displayName: 'Saldo Pengirim Akhir',
    score: 0.440,
    level: 'Sangat Tinggi',
    theme: {
      bg: 'from-red-500/20 to-pink-500/20',
      border: 'border-red-500/30',
      progress: 'bg-red-500',
      text: 'text-red-400',
      badge: 'bg-red-500/20 text-red-400'
    },
    description: 'Saldo akun pengirim (original) setelah transaksi selesai',
    insight: 'Perubahan saldo yang tidak konsisten dengan amount transaksi atau pola manipulasi saldo bisa mengindikasikan penipuan. Feature ini memiliki kontribusi terbesar (44%) dalam deteksi penipuan karena fraudster seringkali melakukan manipulasi saldo untuk menyembunyikan jejak.',
    whyImportant: 'Merupakan indikator utama karena menunjukkan hasil akhir dari transaksi dan dapat mendeteksi inkonsistensi dalam perhitungan saldo.'
  },
  {
    key: 'oldbalanceOrg',
    icon: '🏦',
    label: 'OldbalanceOrg',
    displayName: 'Saldo Pengirim Awal',
    score: 0.190,
    level: 'Tinggi',
    theme: {
      bg: 'from-orange-500/20 to-yellow-500/20',
      border: 'border-orange-500/30',
      progress: 'bg-orange-500',
      text: 'text-orange-400',
      badge: 'bg-orange-500/20 text-orange-400'
    },
    description: 'Saldo akun pengirim (original) sebelum transaksi dilakukan',
    insight: 'Ketidaksesuaian antara saldo awal dengan kemampuan melakukan transaksi besar bisa mencurigakan. Feature ini penting (19%) karena dapat mendeteksi transaksi yang melebihi kemampuan finansial akun.',
    whyImportant: 'Membantu mengidentifikasi transaksi yang tidak masuk akal berdasarkan saldo awal pengirim.'
  },
  {
    key: 'type',
    icon: '💳',
    label: 'Type',
    displayName: 'Jenis Transaksi',
    score: 0.180,
    level: 'Tinggi',
    theme: {
      bg: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/30',
      progress: 'bg-blue-500',
      text: 'text-blue-400',
      badge: 'bg-blue-500/20 text-blue-400'
    },
    description: 'Jenis transaksi online yang dilakukan (PAYMENT, TRANSFER, CASH-IN, CASH-OUT, DEBIT)',
    insight: 'CASH-OUT dan TRANSFER memiliki risiko penipuan lebih tinggi dibandingkan jenis transaksi lain. Kontribusi 18% menunjukkan pola tertentu pada jenis transaksi yang digunakan untuk penipuan.',
    whyImportant: 'Jenis transaksi tertentu memiliki karakteristik yang lebih rentan terhadap aktivitas penipuan.'
  },
  {
    key: 'amount',
    icon: '💰',
    label: 'Amount',
    displayName: 'Nominal Transaksi',
    score: 0.150,
    level: 'Sedang',
    theme: {
      bg: 'from-green-500/20 to-teal-500/20',
      border: 'border-green-500/30',
      progress: 'bg-green-500',
      text: 'text-green-400',
      badge: 'bg-green-500/20 text-green-400'
    },
    description: 'Jumlah nominal uang yang terlibat pada transaksi',
    insight: 'Transaksi dengan jumlah sangat besar atau pola jumlah tidak wajar bisa mengindikasikan penipuan. Meski kontribusinya 15%, nominal yang tidak biasa seringkali menjadi red flag.',
    whyImportant: 'Nominal transaksi yang ekstrem atau mengikuti pola tertentu dapat mengindikasikan aktivitas mencurigakan.'
  },
  {
    key: 'newbalanceDest',
    icon: '📈',
    label: 'NewbalanceDest',
    displayName: 'Saldo Penerima Akhir',
    score: 0.040,
    level: 'Rendah',
    theme: {
      bg: 'from-purple-500/20 to-violet-500/20',
      border: 'border-purple-500/30',
      progress: 'bg-purple-500',
      text: 'text-purple-400',
      badge: 'bg-purple-500/20 text-purple-400'
    },
    description: 'Saldo penerima (destination) setelah transaksi diterima',
    insight: 'Pola akumulasi dana tidak wajar dalam waktu singkat pada rekening penerima. Kontribusi rendah (4%) menunjukkan bahwa saldo akhir penerima kurang signifikan dalam deteksi.',
    whyImportant: 'Meski kontribusinya kecil, dapat membantu mengidentifikasi pola akumulasi dana yang mencurigakan.'
  },
  {
    key: 'step',
    icon: '⏰',
    label: 'Step',
    displayName: 'Waktu Transaksi',
    score: 0.003,
    level: 'Sangat Rendah',
    theme: {
      bg: 'from-gray-500/20 to-slate-500/20',
      border: 'border-gray-500/30',
      progress: 'bg-gray-500',
      text: 'text-gray-400',
      badge: 'bg-gray-500/20 text-gray-400'
    },
    description: 'Merepresentasikan satuan waktu transaksi, 1 step = 1 jam',
    insight: 'Pola waktu transaksi mencurigakan pada jam atau rentang waktu tidak biasa. Kontribusi sangat rendah (0.3%) menunjukkan waktu kurang berpengaruh pada deteksi penipuan.',
    whyImportant: 'Waktu transaksi memiliki pengaruh minimal dalam mendeteksi penipuan dibanding faktor lain.'
  },
  {
    key: 'oldbalanceDest',
    icon: '🎯',
    label: 'OldbalanceDest',
    displayName: 'Saldo Penerima Awal',
    score: 0.002,
    level: 'Sangat Rendah',
    theme: {
      bg: 'from-slate-500/20 to-gray-500/20',
      border: 'border-slate-500/30',
      progress: 'bg-slate-500',
      text: 'text-slate-400',
      badge: 'bg-slate-500/20 text-slate-400'
    },
    description: 'Saldo penerima (destination) sebelum transaksi diterima',
    insight: 'Rekening penerima dengan saldo 0 yang tiba-tiba menerima transfer besar perlu diwaspadai. Kontribusi terendah (0.2%) menunjukkan pengaruh minimal dalam model.',
    whyImportant: 'Feature ini memiliki kontribusi paling kecil dalam deteksi penipuan, namun tetap bisa memberikan konteks tambahan.'
  }
]

// Summary Statistics
const summaryStats = {
  totalFeatures: 7 as number,
  highImportanceCount: 4 as number,
  lowImportanceCount: 3 as number,
  topFeature: "newbalanceOrig" as string,
  topScore: 0.44 as number,
  combinedTop4Score: 0.96 as number
}

// Custom label component untuk menampilkan nilai di ujung bar
const CustomLabel = ({ x, y, width, height, value }: any) => {
  return (
    <text
      x={Number(x) + Number(width) + 10}
      y={Number(y) + Number(height) / 2}
      fill="#fff"
      textAnchor="start"
      dy="0.35em"
      fontSize="12"
      fontWeight="500"
    >
      {value.toFixed(3)}
    </text>
  )
}

export default function FraudDashboardSection() {
  const [activeTab, setActiveTab] = useState("trends")
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  const navItems = [
    { id: "trends", label: "Trends", icon: TrendingUp },
    { id: "reports", label: "Reports", icon: Target },
  ]

  const toggleFeature = (featureKey: string) => {
    setExpandedFeature(expandedFeature === featureKey ? null : featureKey)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "trends":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">Tren Penipuan Online (2020-2025)</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Line Chart - Cases */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-red-400" />
                  Jumlah Laporan Kasus Penipuan Online
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fraudTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                      <YAxis
                        stroke="rgba(255,255,255,0.7)"
                        fontSize={12}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(14, 25, 71, 0.95)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                        formatter={(value) => [`${value.toLocaleString()} kasus`, "Jumlah Kasus"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="cases"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: "#dc2626" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart - Losses */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-blue-400" />
                  Kerugian Finansial (Miliar Rp)
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fraudTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(14, 25, 71, 0.95)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                        formatter={(value) => [`Rp ${value} Miliar`, "Kerugian"]}
                      />
                      <Bar dataKey="losses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-pink-400" />
                  <div>
                    <p className="text-pink-200 text-sm">Peningkatan Kasus (2020-2025)</p>
                    <p className="text-3xl font-bold text-white">928%</p>
                    <p className="text-green-400 text-sm">↗ 13,087 kasus</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-yellow-200 text-sm">Total Kerugian 2023</p>
                    <p className="text-3xl font-bold text-white">Rp 267.9 M</p>
                    <p className="text-green-400 text-sm">↗ 31% dari 2022</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8 text-orange-400" />
                  <div>
                    <p className="text-orange-200 text-sm">Rata-rata per Hari</p>
                    <p className="text-3xl font-bold text-white">14 kasus</p>
                    <p className="text-red-300 text-sm">Tahun 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "reports":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">📊 Feature Importance dari Model XGBoost</h3>
              <p className="text-white/80 text-lg">Variabel yang mempengaruhi deteksi penipuan berdasarkan model Machine Learning</p>
            </div>

            {/* Feature Importance Chart - Sesuai gambar user dengan perbaikan */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
                Feature Importance Score dari Model XGBoost
              </h4>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureImportanceData}
                    layout="vertical"
                    margin={{ top: 20, right: 100, left: 80, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      type="number" 
                      stroke="rgba(255,255,255,0.7)" 
                      fontSize={11}
                      domain={[0, 0.5]}
                      tickFormatter={(value) => `${(Number(value) * 100).toFixed(0)}%`}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="label" 
                      stroke="rgba(255,255,255,0.7)" 
                      fontSize={11}
                      width={120}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(14, 25, 71, 0.95)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        color : "white",
                      }}
                      itemStyle={{color: "white"}}
                      formatter={(value: any) => [`${(Number(value) * 100).toFixed(1)}%`, "Importance Score"]}
                     
                    />
                    <Bar 
                      dataKey="importance" 
                      maxBarSize={40}
                      minPointSize={2}
                      radius={[0, 2, 2, 0]}
                    >
                      {featureImportanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList 
                        content={CustomLabel}
                        position="right"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Color Legend */}
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  <span className="text-white/80 text-sm">Importance Level:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span className="text-white/70 text-xs">High (0.4+)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span className="text-white/70 text-xs">Medium (0.1-0.4)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-white/70 text-xs">Low (&lt;0.1)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Analysis Accordion */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-3 text-cyan-400" />
                Analisis Detail Setiap Feature
              </h4>

              {featureDetails.map((feature) => (
                <div
                  key={feature.key}
                  className={`bg-gradient-to-r ${feature.theme.bg} border ${feature.theme.border} rounded-xl overflow-hidden transition-all duration-300`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleFeature(feature.key)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h5 className="text-lg font-semibold text-white">
                            {feature.label}
                          </h5>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${feature.theme.badge}`}>
                            {feature.level}
                          </span>
                        </div>
                        <p className="text-sm text-white">
                          Importance Score: <span className="text-white">{feature.score.toFixed(3)}</span> ({(feature.score * 100).toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                    <div className={`${feature.theme.text} transform transition-transform duration-200 ${
                      expandedFeature === feature.key ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {expandedFeature === feature.key && (
                    <div className="px-6 pb-6 space-y-4 border-t border-white/10">
                      <div className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-white/90">Feature Importance</span>
                          <span className={`text-sm font-bold ${feature.theme.text}`}>
                            {feature.score.toFixed(3)}
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${feature.theme.progress} transition-all duration-500`}
                            style={{ width: `${feature.score * 100}%` }}
                          />
                        </div>
                        <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${feature.theme.badge}`}>
                          🔥 {feature.level}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h6 className="text-sm font-semibold text-white mb-2">📝 Deskripsi:</h6>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>

                        <div>
                          <h6 className="text-sm font-semibold text-white mb-2">🔍 Pola Penipuan:</h6>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {feature.insight}
                          </p>
                        </div>

                        <div>
                          <h6 className="text-sm font-semibold text-white mb-2">⚡ Mengapa Penting:</h6>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {feature.whyImportant}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-blue-200 text-sm">Total Features</p>
                    <p className="text-2xl font-bold text-white">{summaryStats.totalFeatures}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-green-200 text-sm">High Importance</p>
                    <p className="text-2xl font-bold text-white">{summaryStats.highImportanceCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-purple-200 text-sm">Top Feature Score</p>
                    <p className="text-2xl font-bold text-white">{Math.round(Number(summaryStats.topScore) * 100)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-orange-400" />
                  <div>
                    <p className="text-orange-200 text-sm">Top 4 Combined</p>
                    <p className="text-2xl font-bold text-white">{Math.round(Number(summaryStats.combinedTop4Score) * 100)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-white mb-4">💡 XGBoost Insights</h5>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• <strong>Balance tracking</strong> adalah kunci utama (63%)</li>
                  <li>• <strong>Jenis transaksi</strong> sangat berpengaruh (18%)</li>
                  <li>• <strong>Waktu transaksi</strong> kurang signifikan (0.3%)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-white mb-4">🔍 Pattern Analysis</h5>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• <strong>NewbalanceOrig</strong> dominan (44%)</li>
                  <li>• <strong>Top 4 features</strong> = 96% akurasi</li>
                  <li>• <strong>Balance pattern</strong> {`>`} Transaction timing</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-white mb-4">🎯 Detection Focus</h5>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• <strong>Saldo manipulasi</strong> (primary indicator)</li>
                  <li>• <strong>CASH-OUT/TRANSFER</strong> berisiko tinggi</li>
                  <li>• <strong>Nominal besar</strong> perlu perhatian khusus</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section id="dashboard" className="relative z-10 min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[80vh]">
          {/* Main Content - Left Side (3/4 width) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 min-h-[600px] border border-white/10">
              {renderContent()}
            </div>
          </div>

          {/* Navigation Sidebar - Right Side (1/4 width) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Fraud Dashboard</h3>
              <nav className="space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 group ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-[#8B5A6B] to-[#4A5568] text-white shadow-lg"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${activeTab === item.id ? "text-white" : "text-white/70 group-hover:text-white"}`}
                      />
                      <span className="font-medium">{item.label}</span>
                      {activeTab === item.id && <ArrowRight className="w-4 h-4 ml-auto" />}
                    </button>
                  )
                })}
              </nav>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <Button asChild className="w-full bg-gradient-to-r from-[#8B5A6B] to-[#4A5568] hover:from-[#4A5568] hover:to-[#8B5A6B] text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Link href="/input-data/online-payment">
                    Predict
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
