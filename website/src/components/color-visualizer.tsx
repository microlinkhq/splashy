'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ColorVisualizer () {
  const pathname = usePathname()
  const router = useRouter()

  const getColorsFromUrl = () =>
    (pathname?.split('/').pop()?.split('-') || []).map(color =>
      color.startsWith('%23') ? color.slice(3) : color
    )

  const isLightColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(0, 2), 16)
    const g = parseInt(hexColor.slice(2, 4), 16)
    const b = parseInt(hexColor.slice(4, 6), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128
  }

  return (
    <div className='relative h-screen w-full'>
      <div className='absolute top-4 left-4 z-10'>
        <Button
          id='back-button'
          variant='outline'
          size='icon'
          onClick={() => router.push('/')}
          className='bg-white dark:bg-gray-800'
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex h-full w-full' id='main'>
        {getColorsFromUrl().map((color, index) => (
          <div
            key={index}
            className='flex-1 flex items-center justify-center'
            style={{ backgroundColor: `#${color}` }}
          >
            <span
              className={`font-mono text-lg tracking-wider
                ${isLightColor(color) ? 'text-black' : 'text-white'}`}
            >
              {`#${color.toUpperCase()}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
