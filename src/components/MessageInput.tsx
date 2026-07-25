import {
  useRef,
  useState,
} from 'react'

type MessageInputProps = {
  onSubmit: (content: string) => void
}

function MessageInput({
  onSubmit,
}: MessageInputProps) {
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  function resizeTextarea() {
    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }

  function submitMessage() {
    const trimmedContent = content.trim()

    if (!trimmedContent) {
      return
    }

    onSubmit(trimmedContent)
    setContent('')

    requestAnimationFrame(() => {
      const textarea = textareaRef.current

      if (textarea) {
        textarea.style.height = 'auto'
        textarea.focus()
      }
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitMessage()
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === 'Enter'
      && !event.shiftKey
      && !event.nativeEvent.isComposing
    ) {
      event.preventDefault()
      submitMessage()
    }
  }

  return (
    <form
      className="message-input"
      onSubmit={handleSubmit}
    >
      <textarea
        ref={textareaRef}
        value={content}
        rows={1}
        aria-label="Votre question"
        placeholder="Posez votre question..."
        onChange={(event) => {
          setContent(event.target.value)
          resizeTextarea()
        }}
        onKeyDown={handleKeyDown}
      />

      <button
        type="submit"
        disabled={!content.trim()}
      >
        Envoyer
      </button>
    </form>
  )
}

export default MessageInput
