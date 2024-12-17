import './globals.css'
import Providers from './providers'
import { ReactNode } from 'react'

export const metadata = {
  title: 'My Next App',
  description: 'Personal Project',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
