import { useEffect, useRef } from 'react'
import AssistantMessage from './AssistantMessage'
import UserMessage from './UserMessage'
import TypingIndicator from './TypingIndicator'
import type { Message } from '../models/Message'

type MessagesListProps = {
  messages: Message[]
  isTyping: boolean
}

function MessagesList({
  messages,
  isTyping,
}: MessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages, isTyping])

  return (
    <section className="messages-list">
      {messages.map((message) =>
        message.role === 'user'
          ? (
            <UserMessage
              key={message.id}
              content={message.content}
            />
          )
          : (
            <AssistantMessage
              key={message.id}
              content={message.content}
            />
          ),
      )}

      {isTyping && <TypingIndicator />}

      <div
        ref={messagesEndRef}
        className="messages-list__end"
        aria-hidden="true"
      />
    </section>
  )
}

export default MessagesList
