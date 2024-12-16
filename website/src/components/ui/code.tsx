import { highlight } from 'sugar-high'
import React from 'react'

interface CodeProps {
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Code ({ children, className, onClick }: CodeProps) {
  return (
    <div className={className} onClick={onClick}>
      <pre>
        <code
          className='text-xs md:text-sm'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: highlight(children as string) }}
        />
      </pre>
    </div>
  )
}
