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
    <main
      className={
        hasMessages
          ? 'conversation-area has-messages'
          : 'conversation-area is-empty'
      }
    >
      <div className="conversation-area__content">
        {hasMessages ? (
          <MessagesList
            messages={messages}
            isTyping={isTyping}
          />
        ) : (
          <WelcomeScreen />
        )}
      </div>

      <div className="conversation-area__composer">
        <MessageInput onSubmit={onSubmit} />
      </div>
    </main>
  )
}

export default ConversationArea
