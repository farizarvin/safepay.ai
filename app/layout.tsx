import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'safepay',
  description: 'Aplikasi canggih berbasis kecerdasan buatan dan machine learning yang dirancang untuk mendeteksi dan mencegah penipuan online secara efektif. Dengan teknologi analisis pola dan prediksi risiko, aplikasi ini membantu mengidentifikasi aktivitas mencurigakan dan melindungi pengguna dari berbagai modus penipuan digital yang semakin kompleks.',
  generator: 'next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
