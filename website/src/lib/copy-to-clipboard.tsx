type ToastProps = {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

type Toast = (props: ToastProps) => void

const toClipboard = async (text: string) => {
  if (navigator.clipboard) return navigator.clipboard.writeText(text)
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

export const creatCopyToClipboard = (toast: Toast) => (text: string, type?: string) => {
  toClipboard(text).then(
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
