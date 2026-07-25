import WelcomeScreen from './WelcomeScreen'
import MessagesList from './MessagesList'
import MessageInput from './MessageInput'
import type { Message } from '../models/Message'

type ConversationAreaProps = {
  messages: Message[]
  isTyping: boolean
  onSubmit: (content: string) => void
}

function ConversationArea({
  messages,
  isTyping,
  onSubmit,
}: ConversationAreaProps) {
  const hasMessages = messages.length > 0

  return (
    <main className="conversation-area">
      {hasMessages
        ? (
          <MessagesList
            messages={messages}
            isTyping={isTyping}
          />
        )
        : <WelcomeScreen />
      }

      <MessageInput onSubmit={onSubmit} />
    </main>
  )
}

export default ConversationArea
