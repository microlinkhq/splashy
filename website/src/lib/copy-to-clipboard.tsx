type ToastProps = {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

type Toast = (props: ToastProps) => void

export const creatCopyToClipboard =
  (toast: Toast) => (text: string, type?: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: 'Copied to clipboard',
          description: `${type} has been copied to your clipboard.`
        })
      },
      err => {
        console.error('Could not copy text: ', err)
        toast({
          title: 'Error',
          description: 'Failed to copy to clipboard.',
          variant: 'destructive'
        })
      }
    )
  }
