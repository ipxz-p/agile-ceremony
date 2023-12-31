import type { Metadata } from 'next'
import { Inter, Gloria_Hallelujah, Outfit } from 'next/font/google'
import './globals.css'
import AuthProvider from './context/AuthProvider'
const outfit = Outfit({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default function AllLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
