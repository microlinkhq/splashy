'use client'

import { creatCopyToClipboard } from '@/lib/copy-to-clipboard'
import { useToast } from '@/hooks/use-toast'
import { Link } from '@/components/ui/link'
import { Code } from '@/components/ui/code'

const microlinkSnippet = `// all the images detected will be returns palette
fetch('https://api.microlink.io?url=https://splashy.microlink.io&palette')
  .then(res => res.json())
`

const MicrolinkAPI = () => (
  <Link href='https://microlink.io/docs/api/getting-started/overview'>Microlink API</Link>
)

export function FAQ () {
  const { toast } = useToast()
  const copyToClipboard = creatCopyToClipboard(toast)

  return (
    <section id='faq' className='space-y-8'>
      <div className='space-y-6'>
        <div>
          <h3 className='text-xl font-semibold mb-6'>What is Splashy?</h3>
          <p className=''>
            <b>Splashy</b> is a tiny library for getting predominant colors for any image, an image
            focusing on speed and compability.
          </p>
          <p className='pt-6'>
            The source code is available on{' '}
            <Link href='https://github.com/microlinkhq/splashy'>GitHub</Link>.
          </p>
          <p className='pt-6'>
            It&apos;s supports more than 20 file formats, check{' '}
            <Link href='https://github.com/microlinkhq/splashy/tree/master/benchmark'>
              benchmark
            </Link>
            .
          </p>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-6'>How to use Splashy?</h3>
          <p className=''>
            <b>Splashy</b> is available in the npm registry; any Node.js project can use it:
          </p>
          <Code
            className='pt-6 cursor-pointer'
            onClick={() => copyToClipboard('npm install splashy --save', 'npm install')}
          >
            npm install splashy --save
          </Code>
          <p className='pt-6'>
            You can also use it via <MicrolinkAPI />.
          </p>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-6'>Why use Microlink API?</h3>
          <p className=''>
            <b>Splashy</b> relies into{' '}
            <Link href='https://github.com/libvips/libvips'>libvips</Link>, meaning the system needs
            to be provisioned in order to support all the images formats.
          </p>
          <p className='pt-6'>
            <Link href='https://microlink.io/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            is already provisioned and ready to be used passing `palette` query parameter:
          </p>
          <Code
            className='pt-6 cursor-pointer'
            onClick={() => copyToClipboard(microlinkSnippet, 'microlink snippet')}
          >
            {microlinkSnippet}
          </Code>
          <p className='pt-6'>We recommend to consume splashy from Microlink API.</p>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-6'>Is Microlink free to use?</h3>
          <p className=''>
            <Link href='https://microlink.io/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            has a forever free endpoint you can use.
          </p>
          <p className='pt-6'>
            The free plan runs under some limitation to avoid abusive usage of the platform, like
            burst rate, limited concurrency rate and daily rate limit.
          </p>
          <p className='pt-6'>
            The free plan should be enough for little projects or low API quota.
          </p>
        </div>
      </div>
    </section>
  )
}
