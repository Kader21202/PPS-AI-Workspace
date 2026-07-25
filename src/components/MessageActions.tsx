import { useState } from 'react'

type MessageActionsProps = {
  content: string
}

function MessageActions({
  content,
}: MessageActionsProps) {
  const [isCopied, setIsCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content)
      setIsCopied(true)

      window.setTimeout(() => {
        setIsCopied(false)
      }, 1800)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <div className="message-actions" aria-label="Actions de la réponse">
      <button type="button">
        📚 Sources
      </button>

      <button
        type="button"
        onClick={handleCopy}
      >
        {isCopied ? '✓ Copié' : '📋 Copier'}
      </button>

      <button type="button">
        📄 PDF
      </button>
    </div>
  )
}

export default MessageActions
