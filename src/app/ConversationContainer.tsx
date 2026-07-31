import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ConversationArea from '../components/ConversationArea'
import ConversationController from '../controllers/ConversationController'
import PPSMarocV2ResponseProvider from '../providers/PPSMarocV2ResponseProvider'
import type { Conversation } from '../models/Conversation'
import type { Message } from '../models/Message'

const responseProvider = new PPSMarocV2ResponseProvider()
function ConversationContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    null,
  )
  const [lastAssistantResponse, setLastAssistantResponse] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const conversationController = useMemo(
    () =>
      new ConversationController({
        responseProvider,
        onMessagesChange: setMessages,
        onConversationsChange: setConversations,
        onActiveConversationChange: setActiveConversationId,
        onTypingChange: setIsTyping,
        onAssistantResponse: setLastAssistantResponse,
      }),
    [],
  )


  function handleNewConversation(): void {
    conversationController.createConversation()
  }

  function handleSelectConversation(conversationId: string): void {
    conversationController.selectConversation(conversationId)
  }

  async function handleSubmit(content: string): Promise<void> {
    await conversationController.submit(content)
  }

  return (
    <>
      <Sidebar
        lastAssistantResponse={lastAssistantResponse}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewConversation={handleNewConversation}
        onSelectConversation={handleSelectConversation}
      />

      <ConversationArea
        messages={messages}
        isTyping={isTyping}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default ConversationContainer





