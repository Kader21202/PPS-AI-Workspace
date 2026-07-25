import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ConversationContainer from '../app/ConversationContainer'
import type { Conversation } from '../models/Conversation'

function MainLayout() {
  const [lastAssistantResponse, setLastAssistantResponse] = useState('')
  const [newConversationRequestId, setNewConversationRequestId] = useState(0)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    null,
  )

  function handleNewConversation() {
    setNewConversationRequestId((currentValue) => currentValue + 1)
  }

  return (
    <div className="main-layout">
      <Sidebar
        lastAssistantResponse={lastAssistantResponse}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewConversation={handleNewConversation}
      />

      <ConversationContainer
        onAssistantResponse={setLastAssistantResponse}
        onConversationsChange={setConversations}
        onActiveConversationChange={setActiveConversationId}
        newConversationRequestId={newConversationRequestId}
      />
    </div>
  )
}

export default MainLayout


