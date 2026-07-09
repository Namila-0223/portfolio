import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import '../index.css'

export const metadata = {
  title: "Namila Preshan - Personal UI/UX & Product Design Portfolio",
  description: "Namila Preshan Rupasinghe is a world-class UI/UX Engineer specializing in interaction design systems, mobile apps, and refined digital experiences.",
  icons: {
    icon: "/favicon.png",
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
