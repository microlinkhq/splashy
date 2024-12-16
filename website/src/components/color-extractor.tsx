/* eslint-disable @next/next/no-img-element */
'use client'

import { Loader2, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useToast } from '@/hooks/use-toast'
import { creatCopyToClipboard } from '@/lib/copy-to-clipboard'

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

  const [imageUrl, setImageUrl] = useState('')
  const [colors, setColors] = useState<ColorFormat[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData()
    const base64data = await getBase64(acceptedFiles[0])
    formData.append('file', acceptedFiles[0])
    await processFiles(formData)
    await setImageUrl(base64data)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleUrlSubmit = async (e: React.FormEvent) => {
    console.log('ola puto')
    e.preventDefault()
    if (imageUrl) {
      console.log('TODO')
      // await processFiles(imageUrl)
    }
  }

  const processFiles = async (formData: FormData) => {
    setIsLoading(true)
    const res = await fetch('/api/', {
      method: 'POST',
      body: formData
    })

    const palette = await res.json()
    console.log(palette)
    setColors(palette)
    setIsLoading(false)
    setImageUrl('') // Clear the input field after processing
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
    <div className=''>
      {colors.length === 0 ? (
        <div>
          <div
            {...getRootProps()}
            className='border-2 rounded-2xl h-[400px] flex flex-col items-center justify-center cursor-pointer border-primary bg-primary/5'
          >
            <input {...getInputProps()} />
            <p className='text-2xl lg:text-4xl font-bold text-primary'>DRAG AN IMAGE HERE</p>
          </div>
          <form
            onSubmit={handleUrlSubmit}
            onClick={handleFormClick}
            className='flex pt-4 space-x-3 items-center'
          >
            <input
              type='url'
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              onClick={handleFormClick}
              placeholder='or paste an image URL'
              className='flex-grow px-4 py-2 border-2 border-zinc-400 hover:border-primary focus:border-primary hover:outline-none focus:outline-none rounded-lg h-10'
            />
            <Button
              type='submit'
              variant='outline'
              className='border-2 hover:border-primary hover:text-primary font-bold h-10 border-zinc-400 text-zinc-400'
              disabled={isLoading}
              onClick={handleFormClick}
            >
              {isLoading && <Loader2 className='animate-spin' />}
              {isLoading ? 'HOLD ON...' : 'DO IT'}
            </Button>
          </form>
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col space-y-4'>
          <div className='w-full max-w-[200px] mx-auto'>
            <img
              src={imageUrl}
              alt='Uploaded image'
              className='w-full h-auto rounded-lg shadow-md'
            />
          </div>
          <div>
            <div className='py-6 inline-grid grid-cols-3 gap-2 justify-center'>
              {colors.map((color, index) => (
                <div
                  onClick={() => copyToClipboard(color.hex, `Color ${color.hex}`)}
                  key={index}
                  className='cursor-pointer rounded-lg shadow-md'
                  style={{
                    height: '6rem',
                    width: '6rem',
                    backgroundColor: color.hex
                  }}
                >
                  <div className='w-full h-full flex items-end justify-center p-1 bg-gradient-to-t from-black/50 to-transparent rounded-lg pb-2'>
                    <span className='text-xs text-white font-medium'>
                      {color.hex.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='space-x-2 flex items-center justify-center'>
            <Button
              onClick={() => copyToClipboard(generateCSSVariables(colors))}
              className='w-auto'
              variant='default'
            >
              Copy as CSS
            </Button>
            <Button
              onClick={() => copyToClipboard(generateJSONObject(colors))}
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
