import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import '../index.css'

export const metadata = {
  title: "Namila Preshan - Personal UI/UX & Product Design Portfolio",
  description: "Namila Preshan Rupasinghe is a world-class UI/UX Engineer specializing in interaction design systems, mobile apps, and refined digital experiences.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' rx='20' fill='%23ff4925'/%3E%3Ctext y='70' x='20' font-family='sans-serif' font-size='60' font-weight='bold' fill='white'%3EN%3C/text%3E%3C/svg%3E",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0a0a0a] text-white antialiased overflow-x-hidden" style={{ fontFamily: "'Geist', 'Inter', sans-serif" }}>
        <div className="noise-overlay" />
        <PageTransition>
          <Header />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  )
}
