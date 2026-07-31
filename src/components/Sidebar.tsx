import { useState } from 'react'
import {
  BookOpen,
  Copy,
  FileText,
  LogOut,
  MessageSquare,
  Plus,
  ThumbsUp,
  User,
} from 'lucide-react'
import type { Conversation } from '../models/Conversation'

type SidebarProps = {
  lastAssistantResponse: string
  conversations?: Conversation[]
  activeConversationId?: string | null
  onNewConversation?: () => void
  onSelectConversation?: (conversationId: string) => void
}

function Sidebar({
  lastAssistantResponse,
  conversations = [],
  activeConversationId = null,
  onNewConversation,
  onSelectConversation,
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
      <div className="sidebar-primary">
        <button
          className="new-chat-button"
          type="button"
          onClick={onNewConversation}
        >
          <Plus
            className="new-chat-button__icon"
            size={19}
            strokeWidth={2}
            aria-hidden="true"
          />

          <span>Nouvelle discussion</span>
        </button>

        <section
          className="sidebar-response-actions"
          aria-labelledby="sidebar-response-actions-title"
        >
          <div className="sidebar-section-heading">
            <h2 id="sidebar-response-actions-title">
              Dernière réponse
            </h2>

            <span
              className={
                hasResponse
                  ? 'sidebar-response-status is-available'
                  : 'sidebar-response-status'
              }
            >
              {hasResponse ? 'Disponible' : 'Aucune'}
            </span>
          </div>

          <div className="sidebar-response-actions__grid">
            <button
              type="button"
              className="sidebar-action-button"
              disabled={!hasResponse}
              onClick={handleSources}
              aria-label="Sources"
              title="Sources"
            >
              <BookOpen size={18} strokeWidth={1.9} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="sidebar-action-button"
              disabled={!hasResponse}
              onClick={handleCopy}
              aria-label={isCopied ? 'Réponse copiée' : 'Copier'}
              title={isCopied ? 'Copié' : 'Copier'}
            >
              <Copy size={18} strokeWidth={1.9} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="sidebar-action-button"
              disabled={!hasResponse}
              onClick={handlePdf}
              aria-label="Exporter en PDF"
              title="PDF"
            >
              <FileText size={18} strokeWidth={1.9} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="sidebar-action-button"
              disabled={!hasResponse}
              onClick={handleLike}
              aria-label={
                isLiked
                  ? 'Retirer l’appréciation'
                  : 'J’aime'
              }
              title={isLiked ? 'Appréciée' : 'J’aime'}
              aria-pressed={isLiked}
            >
              <ThumbsUp
                size={18}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </button>
          </div>
        </section>

        <nav
          className="sidebar-menu"
          aria-label="Navigation des conversations"
        >
          <p className="sidebar-navigation-label">Navigation</p>

          <button
            className="sidebar-menu__item is-active"
            type="button"
            aria-current="page"
          >
            <MessageSquare
              className="sidebar-menu__icon"
              size={18}
              strokeWidth={1.9}
              aria-hidden="true"
            />

            <span>Conversations</span>
          </button>
        </nav>
      </div>

      <section
        className="conversation-history"
        aria-labelledby="conversation-history-title"
      >
        <div className="conversation-history__header">
          <h2 id="conversation-history-title">Historique</h2>

          <span className="conversation-history__count">
            {conversations.length}
          </span>
        </div>

        {hasConversations ? (
          <ul className="conversation-history-list">
            {conversations.map((conversation) => {
              const isActive =
                conversation.id === activeConversationId

              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    className={
                      isActive
                        ? 'conversation-history-item is-active'
                        : 'conversation-history-item'
                    }
                    onClick={() =>
                      onSelectConversation?.(conversation.id)
                    }
                    aria-pressed={isActive}
                    title={conversation.title}
                  >
                    <span
                      className="conversation-history-item__marker"
                      aria-hidden="true"
                    />

                    <span className="conversation-history-item__title">
                      {conversation.title}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="conversation-history-empty">
            <MessageSquare
              className="conversation-history-empty__icon"
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <p>Aucune conversation enregistrée.</p>
          </div>
        )}
      </section>

      <div className="sidebar-account">
        <div className="sidebar-account__identity">
          <span className="sidebar-account__avatar" aria-hidden="true">
            <User size={17} strokeWidth={1.9} />
          </span>

          <div>
            <strong>Utilisateur</strong>
            <span>Compte PPS</span>
          </div>
        </div>

        <nav className="sidebar-settings" aria-label="Compte utilisateur">
          <button type="button">
            <User size={15} strokeWidth={1.9} aria-hidden="true" />
            <span>Profil</span>
          </button>

          <button type="button">
            <LogOut size={15} strokeWidth={1.9} aria-hidden="true" />
            <span>Déconnexion</span>
          </button>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
