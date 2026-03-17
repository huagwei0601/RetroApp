import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RetroApp',
  description: 'Modern apps reimagined in Windows 98',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
          fontSize: '11px',
          background: 'var(--win98-desktop)',
          margin: 0,
          padding: 0,
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  )
}
