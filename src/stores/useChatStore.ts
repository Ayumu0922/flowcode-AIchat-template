import { create } from 'zustand'
import type { Conversation, Message } from '@/data/mockConversations'
import { mockConversations } from '@/data/mockConversations'

const mockResponses = [
  'ご質問ありがとうございます。確認いたしますので、少々お待ちください。',
  '承知しました。社内規定に基づいてお答えいたします。',
  'その件について、関連する情報をまとめました。他に気になる点があればお知らせください。',
  'はい、対応可能です。詳細な手順をご案内しますね。',
  'お力になれてよかったです。他にご不明な点がございましたら、お気軽にお問い合わせください。',
]

interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  isTyping: boolean
  setActiveConversation: (id: string | null) => void
  sendMessage: (content: string) => void
  createNewConversation: () => string
  getActiveConversation: () => Conversation | undefined
  regenerateMessage: (messageId: string) => void
  deleteMessage: (messageId: string) => void
  editMessage: (messageId: string, newContent: string) => void
}

export const useChatStore = create<ChatState>()((set, get) => ({
  conversations: mockConversations,
  activeConversationId: null,
  isTyping: false,

  setActiveConversation: (id) => set({ activeConversationId: id }),

  getActiveConversation: () => {
    const { conversations, activeConversationId } = get()
    return conversations.find((c) => c.id === activeConversationId)
  },

  createNewConversation: () => {
    const newId = `conv-${Date.now()}`
    const newConversation: Conversation = {
      id: newId,
      title: '新しい会話',
      preview: '',
      category: '一般',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    }
    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      activeConversationId: newId,
    }))
    return newId
  },

  sendMessage: (content) => {
    const { activeConversationId } = get()
    if (!activeConversationId) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    }

    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              preview: content,
              title:
                conv.messages.length === 0
                  ? content.slice(0, 30) + (content.length > 30 ? '...' : '')
                  : conv.title,
              updatedAt: new Date().toISOString(),
            }
          : conv,
      ),
    }))

    // Simulate AI response
    set({ isTyping: true })
    setTimeout(() => {
      const response =
        mockResponses[Math.floor(Math.random() * mockResponses.length)]
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      }

      set((state) => ({
        isTyping: false,
        conversations: state.conversations.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, aiMessage],
                updatedAt: new Date().toISOString(),
              }
            : conv,
        ),
      }))
    }, 1200 + Math.random() * 800)
  },

  regenerateMessage: (messageId) => {
    const { activeConversationId } = get()
    if (!activeConversationId) return

    // Remove the target AI message and everything after it
    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id !== activeConversationId) return conv
        const idx = conv.messages.findIndex((m) => m.id === messageId)
        if (idx === -1) return conv
        return { ...conv, messages: conv.messages.slice(0, idx) }
      }),
    }))

    // Generate a new response
    set({ isTyping: true })
    setTimeout(() => {
      const response =
        mockResponses[Math.floor(Math.random() * mockResponses.length)]
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      }
      set((state) => ({
        isTyping: false,
        conversations: state.conversations.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, aiMessage], updatedAt: new Date().toISOString() }
            : conv,
        ),
      }))
    }, 1000 + Math.random() * 600)
  },

  deleteMessage: (messageId) => {
    const { activeConversationId } = get()
    if (!activeConversationId) return
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: conv.messages.filter((m) => m.id !== messageId) }
          : conv,
      ),
    }))
  },

  editMessage: (messageId, newContent) => {
    const { activeConversationId } = get()
    if (!activeConversationId) return
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: conv.messages.map((m) =>
                m.id === messageId ? { ...m, content: newContent } : m,
              ),
            }
          : conv,
      ),
    }))
  },
}))
