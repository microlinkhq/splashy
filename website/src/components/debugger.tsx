'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Debugger () {
  const [colors, setColors] = useState<string[]>([
    '#F9AB07',
    '#175CCE',
    '#E4C4D4',
    '#9454AC',
    '#F4BC6C',
    '#0F3D8A'
  ])
  const router = useRouter()

  const generateRandomColor = () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    )
  }

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors]
    newColors[index] = value
    setColors(newColors)
  }

  const handleRandomize = () => {
    setColors(colors.map(() => generateRandomColor()))
  }

  const handleVisualize = () => {
    const colorString = colors.map(color => color.replace('#', '')).join('-')
    router.push(`/${colorString}`)
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow container'>
        <div className='mx-auto dark:bg-gray-800 rounded-lg'>
          <div className='flex flex-wrap gap-4 mb-6'>
            {colors.map((color, index) => (
              <div key={index} className='flex-1 min-w-[200px]'>
                <div className='h-20 rounded-t-lg' style={{ backgroundColor: color }}></div>
                <Input
                  type='text'
                  value={color}
                  onChange={e => handleColorChange(index, e.target.value)}
                  className='rounded-t-none'
                />
              </div>
            ))}
          </div>
          <div className='flex justify-between'>
            <Button onClick={handleRandomize} variant='outline'>
              Randomize
            </Button>
            <Button onClick={handleVisualize}>Visualize</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
