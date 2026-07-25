import type { Conversation } from '../models/Conversation'
import type { Message } from '../models/Message'
import type IResponseProvider from '../providers/IResponseProvider'

type ConversationControllerOptions = {
  responseProvider: IResponseProvider
  onMessagesChange: (messages: Message[]) => void
  onConversationsChange: (conversations: Conversation[]) => void
  onActiveConversationChange: (
    conversationId: string | null,
  ) => void
  onTypingChange: (isTyping: boolean) => void
  onAssistantResponse: (content: string) => void
}

class ConversationController {
  private conversations: Conversation[] = []
  private activeConversationId: string | null = null

  private readonly responseProvider: IResponseProvider
  private readonly onMessagesChange: (
    messages: Message[],
  ) => void
  private readonly onConversationsChange: (
    conversations: Conversation[],
  ) => void
  private readonly onActiveConversationChange: (
    conversationId: string | null,
  ) => void
  private readonly onTypingChange: (
    isTyping: boolean,
  ) => void
  private readonly onAssistantResponse: (
    content: string,
  ) => void

  constructor({
    responseProvider,
    onMessagesChange,
    onConversationsChange,
    onActiveConversationChange,
    onTypingChange,
    onAssistantResponse,
  }: ConversationControllerOptions) {
    this.responseProvider = responseProvider
    this.onMessagesChange = onMessagesChange
    this.onConversationsChange =
      onConversationsChange
    this.onActiveConversationChange =
      onActiveConversationChange
    this.onTypingChange = onTypingChange
    this.onAssistantResponse = onAssistantResponse
  }

  createConversation(): void {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: 'Nouvelle discussion',
      messages: [],
    }

    this.conversations = [
      conversation,
      ...this.conversations,
    ]

    this.activeConversationId = conversation.id

    this.notifyConversationsChange()
    this.onActiveConversationChange(
      this.activeConversationId,
    )
    this.onMessagesChange([])
    this.onTypingChange(false)
    this.onAssistantResponse('')
  }

  selectConversation(id: string): boolean {
    const conversation = this.conversations.find(
      (item) => item.id === id,
    )

    if (!conversation) {
      return false
    }

    this.activeConversationId = conversation.id

    this.onActiveConversationChange(
      this.activeConversationId,
    )

    this.onMessagesChange([
      ...conversation.messages,
    ])

    this.onTypingChange(false)

    const lastAssistantMessage = [
      ...conversation.messages,
    ]
      .reverse()
      .find(
        (message) =>
          message.role === 'assistant',
      )

    this.onAssistantResponse(
      lastAssistantMessage?.content ?? '',
    )

    return true
  }

  getConversations(): Conversation[] {
    return this.conversations.map(
      (conversation) => ({
        ...conversation,
        messages: [...conversation.messages],
      }),
    )
  }

  getActiveConversation(): Conversation | null {
    const conversation =
      this.findActiveConversation()

    if (!conversation) {
      return null
    }

    return {
      ...conversation,
      messages: [...conversation.messages],
    }
  }

  async submit(content: string): Promise<void> {
    let activeConversation =
      this.findActiveConversation()

    if (!activeConversation) {
      this.createConversation()
      activeConversation =
        this.findActiveConversation()
    }

    if (!activeConversation) {
      throw new Error(
        'ConversationController could not create an active conversation.',
      )
    }

    const conversationId = activeConversation.id

    this.updateConversationTitle(
      conversationId,
      content,
    )

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    }

    this.appendMessage(
      conversationId,
      userMessage,
    )

    this.notifyMessagesIfActive(conversationId)
    this.onTypingChange(true)

    const assistantMessageId =
      crypto.randomUUID()

    let assistantMessageCreated = false
    let streamedResponse = ''

    try {
      const finalResponse =
        await this.responseProvider.streamResponse(
          content,
          (chunk) => {
            if (!assistantMessageCreated) {
              const assistantMessage: Message = {
                id: assistantMessageId,
                role: 'assistant',
                content: '',
              }

              this.appendMessage(
                conversationId,
                assistantMessage,
              )

              assistantMessageCreated = true

              if (
                this.activeConversationId ===
                conversationId
              ) {
                this.onTypingChange(false)
              }
            }

            streamedResponse += chunk

            this.updateMessageContent(
              conversationId,
              assistantMessageId,
              streamedResponse,
            )

            this.notifyMessagesIfActive(
              conversationId,
            )

            if (
              this.activeConversationId ===
              conversationId
            ) {
              this.onAssistantResponse(
                streamedResponse,
              )
            }
          },
        )

      if (!assistantMessageCreated) {
        const assistantMessage: Message = {
          id: assistantMessageId,
          role: 'assistant',
          content: finalResponse,
        }

        this.appendMessage(
          conversationId,
          assistantMessage,
        )

        this.notifyMessagesIfActive(
          conversationId,
        )
      } else if (
        streamedResponse !== finalResponse
      ) {
        this.updateMessageContent(
          conversationId,
          assistantMessageId,
          finalResponse,
        )

        this.notifyMessagesIfActive(
          conversationId,
        )
      }

      if (
        this.activeConversationId ===
        conversationId
      ) {
        this.onAssistantResponse(finalResponse)
      }
    } finally {
      if (
        this.activeConversationId ===
        conversationId
      ) {
        this.onTypingChange(false)
      }
    }
  }

  private findActiveConversation(): Conversation | null {
    if (!this.activeConversationId) {
      return null
    }

    return (
      this.conversations.find(
        (conversation) =>
          conversation.id ===
          this.activeConversationId,
      ) ?? null
    )
  }

  private appendMessage(
    conversationId: string,
    message: Message,
  ): void {
    this.conversations =
      this.conversations.map(
        (conversation) => {
          if (
            conversation.id !== conversationId
          ) {
            return conversation
          }

          return {
            ...conversation,
            messages: [
              ...conversation.messages,
              message,
            ],
          }
        },
      )

    this.notifyConversationsChange()
  }

  private updateMessageContent(
    conversationId: string,
    messageId: string,
    content: string,
  ): void {
    this.conversations =
      this.conversations.map(
        (conversation) => {
          if (
            conversation.id !== conversationId
          ) {
            return conversation
          }

          return {
            ...conversation,
            messages:
              conversation.messages.map(
                (message) =>
                  message.id === messageId
                    ? {
                        ...message,
                        content,
                      }
                    : message,
              ),
          }
        },
      )

    this.notifyConversationsChange()
  }

  private notifyMessagesIfActive(
    conversationId: string,
  ): void {
    if (
      this.activeConversationId !==
      conversationId
    ) {
      return
    }

    const activeConversation =
      this.findActiveConversation()

    this.onMessagesChange(
      activeConversation
        ? [...activeConversation.messages]
        : [],
    )
  }

  private notifyConversationsChange(): void {
    this.onConversationsChange(
      this.getConversations(),
    )
  }

  private updateConversationTitle(
    conversationId: string,
    content: string,
  ): void {
    const title =
      content.length > 45
        ? `${content.slice(0, 45).trim()}…`
        : content

    this.conversations = this.conversations.map(
      (conversation) =>
        conversation.id === conversationId &&
        conversation.title === 'Nouvelle discussion'
          ? {
              ...conversation,
              title,
            }
          : conversation,
    )

    this.notifyConversationsChange()
  }
}

export default ConversationController



