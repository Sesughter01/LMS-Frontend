import { Providers } from '@/store/provider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Ingryd',
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
