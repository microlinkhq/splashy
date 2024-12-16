'use client'

import { usePathname } from 'next/navigation'
import { Link } from '@/components/ui/link'
import { cn } from '@/lib/utils'

export const Footer = () => {
  const pathname = usePathname()
  return (
    <footer className='py-4 w-full text-neutral-600 fixed bottom-0 bg-slate-50 bg-opacity-10 backdrop-blur'>
      <nav>
        <ul className='flex justify-center space-x-4'>
          {[
            { href: '/', name: 'Home' },
            { href: '/faq', name: 'FAQ' },
            { href: '/debugger', name: 'Debugger' }
          ].map(({ href, name }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn('hover:text-black', {
                  'font-bold text-black': pathname === href
                })}
              >
                {name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href='https://github.com/microlinkhq/splashy'
              className='flex items-center space-x-2'
            >
              <span>GitHub</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
