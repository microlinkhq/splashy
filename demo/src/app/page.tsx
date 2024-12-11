'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github } from 'lucide-react'

export default function Home () {
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
    <div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900'>
      <main className='flex-grow container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200'>
          Splashy
        </h1>
        <div className='max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
          <div className='flex flex-wrap gap-4 mb-6'>
            {colors.map((color, index) => (
              <div key={index} className='flex-1 min-w-[150px]'>
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
        <div className='mt-8 text-center text-gray-600 dark:text-gray-400'>
          <p>Adjust the colors above or click &apos;Randomize&apos; for a surprise palette.</p>
          <p>
            When you&apos;re ready, click &apos;Visualize&apos; to see your palette in full screen!
          </p>
        </div>
      </main>
      <footer className='bg-white dark:bg-gray-800 py-4 text-center'>
        <div className='flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400'>
          <a
            href='https://github.com/microlinkhq/splashy'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-200 transition-colors'
          >
            <Github className='h-4 w-4' />
            <span>microlinkhq/splashy</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
