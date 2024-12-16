/* eslint-disable @next/next/no-img-element */

import './globals.css'

import { ClassAttributes, ImgHTMLAttributes, JSX } from 'react'
import { Link } from '@/components/ui/link'
import { Inter } from 'next/font/google'
import NextLink from 'next/link'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

const MicrolinkLogo = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLImageElement> &
    ImgHTMLAttributes<HTMLImageElement>
) => (
  <img
    alt='microlink logo'
    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSIzMSI+PHBhdGggZmlsbD0iI2VhNDA3YiIgZD0iTTM4LjQ2Mi4yMDlIMTguNTg3Yy0yLjg3OSAwLTUuMjIxIDIuMjE0LTUuMjIxIDQuOTM1VjcuNjZoMy4zVjUuMTQ0YzAtLjg5NS44NjItMS42MjIgMS45MjEtMS42MjJoMTkuODc1YzEuMDYgMCAxLjkyMS43MjggMS45MjEgMS42MjJWMTcuMjJjMCAuODk0LS44NjIgMS42MjEtMS45MiAxLjYyMUgxOC41ODZjLTEuMDYgMC0xLjkyMi0uNzI3LTEuOTIyLTEuNjIxdi0zLjg1OGgtMy4zdjMuODU4YzAgMi43MiAyLjM0MyA0LjkzNCA1LjIyMiA0LjkzNGgxOS44NzVjMi44NzkgMCA1LjIyLTIuMjE0IDUuMjItNC45MzRWNS4xNDRjMC0yLjcyMi0yLjM0MS00LjkzNS01LjIyLTQuOTM1eiIvPjxwYXRoIGZpbGw9IiM2NTRlYTMiIGQ9Ik0zMC4zMTcgMjUuNzM3VjIzLjIyaC0zLjN2Mi41MTdjMCAuODk1LS44NjIgMS42MjItMS45MjIgMS42MjJINS4yMjFjLTEuMDU5IDAtMS45MjEtLjcyOC0xLjkyMS0xLjYyMlYxMy42NmMwLS44OTQuODYyLTEuNjIxIDEuOTIxLTEuNjIxaDE5Ljg3NGMxLjA2IDAgMS45MjIuNzI3IDEuOTIyIDEuNjIxdjMuODU4aDMuM1YxMy42NmMwLTIuNzItMi4zNDMtNC45MzUtNS4yMjItNC45MzVINS4yMkMyLjM0MyA4LjcyNSAwIDEwLjk0IDAgMTMuNjZ2MTIuMDc3YzAgMi43MjEgMi4zNDMgNC45MzUgNS4yMjEgNC45MzVoMTkuODc0YzIuODggMCA1LjIyMi0yLjIxMyA1LjIyMi00LjkzNXoiLz48L3N2Zz4K'
    {...props}
  />
)

export const BaseLayout = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <html lang='en'>
      <body className={className}>{children}</body>
    </html>
  )
}

export const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className} bg-slate-50`}>
      <div
        aria-hidden='true'
        className='-z-10 absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20'
      >
        <div className='blur-[106px] h-32 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700' />
        <div className='blur-[106px] h-24 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600' />
      </div>
      <header className='container pt-8 max-w-xl mx-auto px-4 text-center'>
        <NextLink href='/'>
          <h1 className='text-5xl lg:text-8xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700'>
            SPLASHY
          </h1>
        </NextLink>

        <p className='text-xl'>Get predominant colors for any image.</p>
        <p className='text-neutral-600 pt-2'>
          Powered by{' '}
          <Link href='https://microlink.io'>
            <MicrolinkLogo className='inline h-4 mr-2' /> Microlink.io
          </Link>
        </p>
      </header>
      <main className='pt-8 max-w-xl mx-auto px-4'>{children}</main>
      <Toaster />
      <Footer />
    </div>
  )
}
