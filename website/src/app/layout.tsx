import { BaseLayout } from '@/components/layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Splashy',
  description: 'Get predominant colors for any image.',
  authors: [{ name: 'Microlink HQ', url: 'https://microlink.io' }],
  other: {
    ['twitter:label1']: 'Node.js',
    ['twitter:data1']: 'npm install splashy'
  }
}

export default function Layout ({ children }: { children: React.ReactNode }) {
  return <BaseLayout>{children}</BaseLayout>
}
