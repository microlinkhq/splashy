import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Splashy',
  description: 'Create and visualize beautiful color palettes with Splashy'
}

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>{children}</body>
    </html>
  )
}
