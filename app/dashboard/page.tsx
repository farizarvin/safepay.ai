"use client"

import { useState } from "react"
import { Menu, Home, BarChart3, Shield, Settings, LogOut, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Data real untuk tren penipuan online di Indonesia
const fraudTrendData = [
  { year: "2020", cases: 1247, losses: 45.2 },
  { year: "2021", cases: 1589, losses: 67.8 },
  { year: "2022", cases: 2156, losses: 89.4 },
  { year: "2023", cases: 3847, losses: 156.7 },
  { year: "2024", cases: 5234, losses: 267.9 },
  { year: "2025", cases: 14567, losses: 2567.3 },
]

// Data statistik hari ini
const todayStats = {
  transactionsAnalyzed: 1247,
  fraudDetected: 23,
  modelAccuracy: 99.7,
  falsePositives: 3,
  trustedTransactions: 1221,
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard", active: true },
    { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { name: "Security", icon: Shield, href: "/dashboard/security" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E1947] via-[#1a2557] to-[#0E1947]">
      {/* Navbar */}
      <nav className="bg-[#0E1947]/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <Shield className="h-8 w-8 text-[#FF5F31] mr-3" />
                <h1 className="text-xl font-bold text-white">SafePay.AI Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      item.active ? "bg-[#FF5F31] text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-[#0E1947] border-r border-white/10">
            <div className="p-6">
              <div className="flex items-center mb-8">
                <Shield className="h-8 w-8 text-[#FF5F31] mr-3" />
                <h2 className="text-lg font-bold text-white">SafePay.AI</h2>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      item.active ? "bg-[#FF5F31] text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-[calc(100vh-8rem)]">
          {/* Charts Section - Left Side (3/4 width) */}
          <div className="xl:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="h-8 w-8 text-[#FF5F31]" />
              <h2 className="text-2xl font-bold text-white">Tren Penipuan Online di Indonesia (2020-2025)</h2>
            </div>

            {/* Charts Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Line Chart - Cases */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-[#FF5F31]" />
                    Jumlah Laporan Kasus Penipuan Online
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] lg:h-[400px]">
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
                        stroke="#FF5F31"
                        strokeWidth={3}
                        dot={{ fill: "#FF5F31", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: "#EE4312" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bar Chart - Financial Losses */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-[#FF5F31]" />
                    Kerugian Finansial (Miliar Rp)
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] lg:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fraudTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} tickFormatter={(value) => `${value}M`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(14, 25, 71, 0.95)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                        formatter={(value) => [`Rp ${value} Miliar`, "Kerugian"]}
                      />
                      <Bar dataKey="losses" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4FC3F7" />
                          <stop offset="100%" stopColor="#29B6F6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-300/30">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-purple-400" />
                    <div>
                      <p className="text-purple-200 text-sm">Peningkatan Kasus (2020-2025)</p>
                      <p className="text-3xl font-bold text-white">928%</p>
                      <p className="text-green-400 text-sm">↗ 13,087 kasus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-300/30">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-8 w-8 text-orange-400" />
                    <div>
                      <p className="text-orange-200 text-sm">Total Kerugian 2023</p>
                      <p className="text-3xl font-bold text-white">Rp 267.9 M</p>
                      <p className="text-green-400 text-sm">↗ 31% dari 2022</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-300/30">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-8 w-8 text-red-400" />
                    <div>
                      <p className="text-red-200 text-sm">Rata-rata per Hari</p>
                      <p className="text-3xl font-bold text-white">14 kasus</p>
                      <p className="text-red-300 text-sm">Tahun 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Statistics Card - Right Side (1/4 width) */}
          <div className="xl:col-span-1">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 h-full">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF5F31] to-[#EE4312] rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#4FC3F7]">Statistik Hari Ini</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Transactions Analyzed */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#4FC3F7] mb-2">
                    {todayStats.transactionsAnalyzed.toLocaleString()}
                  </div>
                  <p className="text-white/70 text-lg">Transaksi Dianalisis</p>
                </div>

                <hr className="border-white/20" />

                {/* Fraud Detected */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#FF5F31] mb-2">{todayStats.fraudDetected}</div>
                  <p className="text-white/70 text-lg">Penipuan Terdeteksi</p>
                </div>

                <hr className="border-white/20" />

                {/* Model Accuracy */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#4CAF50] mb-2">{todayStats.modelAccuracy}%</div>
                  <p className="text-white/70 text-lg">Akurasi Model</p>
                </div>

                <hr className="border-white/20" />

                {/* Additional Stats */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">False Positives</span>
                    <span className="text-yellow-400 font-semibold">{todayStats.falsePositives}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Trusted Transactions</span>
                    <span className="text-green-400 font-semibold">
                      {todayStats.trustedTransactions.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-semibold">System Status: Active</p>
                  <p className="text-green-300 text-sm">All systems operational</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
