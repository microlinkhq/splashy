/* eslint-disable @next/next/no-img-element */
'use client'

import { creatCopyToClipboard } from '@/lib/copy-to-clipboard'
import { Loader2, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDropzone } from 'react-dropzone'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

interface ColorFormat {
  rgb: string
  rgba: string
  hex: string
  hsl: string
}

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

function generateCSSVariables (colors: ColorFormat[]): string {
  return `:root {\n${colors
    .map((color, index) => `  --color-${index + 1}: ${color.hex};`)
    .join('\n')}\n}`
}

function generateJSONObject (colors: ColorFormat[]): string {
  return JSON.stringify(
    colors.reduce((acc: { [key: string]: ColorFormat }, color, index) => {
      acc[`color${index + 1}`] = color
      return acc
    }, {}),
    null,
    2
  )
}

export function ColorExtractor () {
  const { toast } = useToast()
  const copyToClipboard = creatCopyToClipboard(toast)

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [colors, setColors] = useState<ColorFormat[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])
    await processFiles(formData)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (imageUrl) {
      const res = await fetch(imageUrl)
      const buffer = Buffer.from(await res.arrayBuffer())
      const formData = new FormData()
      formData.append('file', new Blob([buffer]))
      await processFiles(formData)
    }
  }

  const processFiles = async (formData: FormData) => {
    setIsLoading(true)
    const res = await fetch('/api/', {
      method: 'POST',
      body: formData
    })
    setColors(await res.json())
    if (!imageUrl) setImageUrl(await getBase64(formData.get('file') as File))
    setIsLoading(false)
  }

  const resetState = () => {
    setColors([])
    setImageUrl('')
    setIsLoading(false)
  }

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div>
      {colors.length === 0 ? (
        <div>
          <div
            {...getRootProps()}
            className='border-2 rounded-2xl lg:h-[400px] h-[200px] flex flex-col items-center justify-center cursor-pointer border-primary bg-primary/5'
          >
            <input {...getInputProps()} />
            <p className='text-2xl lg:text-4xl font-bold text-primary'>
              {isLoading && <Loader2 className='animate-spin h-10 w-10' />}
              {!isLoading && 'DRAG AN IMAGE HERE'}
            </p>
          </div>
          {!isLoading && (
            <form
              onSubmit={handleUrlSubmit}
              onClick={handleFormClick}
              className='flex flex-col lg:flex-row pt-4 lg:space-x-3 items-center'
            >
              <input
                type='url'
                onChange={e => setImageUrl(e.target.value)}
                onClick={handleFormClick}
                placeholder='or paste an image URL'
                className='flex-grow px-4 py-2 border-2 border-zinc-400 hover:border-primary focus:border-primary hover:outline-none focus:outline-none rounded-lg h-10 w-full'
              />
              <Button
                type='submit'
                variant='outline'
                className='border-2 hover:border-primary hover:text-primary font-bold h-10 border-zinc-400 text-zinc-400 w-full lg:w-[inherit] lg:mt-0 mt-2'
                disabled={isLoading}
                onClick={handleFormClick}
              >
                {isLoading && <Loader2 className='animate-spin' />}
                {isLoading ? 'HOLD ON...' : 'DO IT'}
              </Button>
            </form>
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col lg:space-y-0 space-y-4'>
          <img src={imageUrl} alt='Uploaded image' className='w-full h-auto rounded-lg shadow-md' />
          <div className='py-6 inline-grid lg:grid-cols-6 grid-cols-3 gap-2'>
            {colors.map((color, index) => (
              <div
                onClick={() => copyToClipboard(color.hex, `Color ${color.hex}`)}
                key={index}
                className='cursor-pointer rounded-lg shadow-md h-20 w-20'
                style={{ backgroundColor: color.hex }}
              >
                <div className='w-full h-full flex items-end justify-center p-1 bg-gradient-to-t from-black/20 to-transparent rounded-lg pb-2'>
                  <span className='text-xs text-white font-medium'>{color.hex.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='space-x-2 flex items-center justify-center'>
            <Button
              onClick={() => copyToClipboard(generateCSSVariables(colors), 'CSS Variables')}
              className='w-auto'
              variant='default'
            >
              Copy as CSS
            </Button>
            <Button
              onClick={() => copyToClipboard(generateJSONObject(colors), 'JSON')}
              className='w-auto'
              variant='secondary'
            >
              Copy as JSON
            </Button>
            <Button onClick={resetState} variant='outline' className='w-auto'>
              <RefreshCcw className='w-4 h-4 mr-2' />
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
