import { useEffect, useMemo, useRef, useState } from 'react'
import ConversationArea from '../components/ConversationArea'
import ConversationController from '../controllers/ConversationController'
import MockResponseProvider from '../providers/MockResponseProvider'
import type { Conversation } from '../models/Conversation'
import type { Message } from '../models/Message'

const responseProvider = new MockResponseProvider()

type ConversationContainerProps = {
  onAssistantResponse: (content: string) => void
  onConversationsChange: (conversations: Conversation[]) => void
  onActiveConversationChange: (conversationId: string | null) => void
  newConversationRequestId?: number
}

function ConversationContainer({
  onAssistantResponse,
  onConversationsChange,
  onActiveConversationChange,
  newConversationRequestId = 0,
}: ConversationContainerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const previousRequestId = useRef(newConversationRequestId)

  const conversationController = useMemo(
    () =>
      new ConversationController({
        responseProvider,
        onMessagesChange: setMessages,
        onConversationsChange,
        onActiveConversationChange,
        onTypingChange: setIsTyping,
        onAssistantResponse,
      }),
    [onActiveConversationChange, onAssistantResponse, onConversationsChange],
  )

  useEffect(() => {
    if (newConversationRequestId === previousRequestId.current) {
      return
    }

    previousRequestId.current = newConversationRequestId
    conversationController.createConversation()
  }, [conversationController, newConversationRequestId])

  async function handleSubmit(content: string): Promise<void> {
    await conversationController.submit(content)
  }

  return (
    <ConversationArea
      messages={messages}
      isTyping={isTyping}
      onSubmit={handleSubmit}
    />
  )
}

export default ConversationContainer

