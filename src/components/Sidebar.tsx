import { useState } from 'react'
import type { Conversation } from '../models/Conversation'

type SidebarProps = {
  lastAssistantResponse: string
  conversations?: Conversation[]
  activeConversationId?: string | null
  onNewConversation?: () => void
}

function Sidebar({
  lastAssistantResponse,
  conversations = [],
  activeConversationId = null,
  onNewConversation,
}: SidebarProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const hasResponse = Boolean(lastAssistantResponse.trim())
  const hasConversations = conversations.length > 0

  async function handleCopy() {
    if (!hasResponse) return

    try {
      await navigator.clipboard.writeText(lastAssistantResponse)
      setIsCopied(true)

      window.setTimeout(() => {
        setIsCopied(false)
      }, 1800)
    } catch {
      setIsCopied(false)
    }
  }

  function handleSources() {
    if (!hasResponse) return

    window.alert(
      'Aucune source n’est disponible pour cette réponse locale de démonstration.',
    )
  }

  function handlePdf() {
    if (!hasResponse) return
    window.print()
  }

  function handleLike() {
    if (!hasResponse) return
    setIsLiked((currentValue) => !currentValue)
  }

  return (
    <aside className="sidebar" aria-label="Navigation principale">
      <button
        className="new-chat-button"
        type="button"
        onClick={onNewConversation}
      >
        + Nouvelle discussion
      </button>

      <div
        className="sidebar-response-actions"
        aria-label="Actions de la dernière réponse"
      >
        <button
          type="button"
          disabled={!hasResponse}
          onClick={handleSources}
        >
          📚 Sources
        </button>

        <button
          type="button"
          disabled={!hasResponse}
          onClick={handleCopy}
        >
          {isCopied ? '✓ Copié' : '📋 Copier la réponse'}
        </button>

        <button
          type="button"
          disabled={!hasResponse}
          onClick={handlePdf}
        >
          📄 Exporter en PDF
        </button>

        <button
          type="button"
          disabled={!hasResponse}
          onClick={handleLike}
          aria-pressed={isLiked}
        >
          {isLiked ? '✓ Réponse appréciée' : '👍 J’aime'}
        </button>
      </div>

      <nav
        className="sidebar-menu"
        aria-label="Navigation des conversations"
      >
        <button type="button">
          💬 Conversations
        </button>
      </nav>

      <section
        className="conversation-history"
        aria-label="Historique des conversations"
      >
        <h2>Historique</h2>

        {hasConversations ? (
          <ul className="conversation-history-list">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <button
                  type="button"
                  className="conversation-history-item"
                >
                  {conversation.id === activeConversationId ? '●' : '○'}{' '}
                  {conversation.title}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="conversation-history-empty">
            Aucune conversation enregistrée.
          </p>
        )}
      </section>

      <nav
  className="sidebar-settings"
  aria-label="Compte utilisateur"
>
  <button type="button">
    👤 Profil
  </button>

  <button type="button">
    🚪 Déconnexion
  </button>
</nav>

      <footer className="sidebar-footer">
        Utilisateur
      </footer>
    </aside>
  )
}

export default Sidebar


