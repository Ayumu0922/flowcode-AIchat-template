import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import { useChatStore } from '@/stores/useChatStore'
import { theme } from '@/lib/theme'

export function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const {
    activeConversationId,
    isTyping,
    setActiveConversation,
    sendMessage,
    createNewConversation,
    getActiveConversation,
  } = useChatStore()

  useEffect(() => {
    if (id) {
      setActiveConversation(id)
    }
  }, [id, activeConversationId, setActiveConversation])

  const activeConv = getActiveConversation()
  const messages = id
    ? useChatStore.getState().conversations.find((c) => c.id === id)?.messages
    : activeConv?.messages

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages?.length, isTyping])

  const currentConv = id
    ? useChatStore.getState().conversations.find((c) => c.id === id)
    : activeConv

  const handleSend = (content: string) => {
    if (!currentConv) {
      const newId = createNewConversation()
      navigate(`/chat/${newId}`)
      setTimeout(() => sendMessage(content), 50)
    } else {
      sendMessage(content)
    }
  }

  return (
    <div className="flex flex-1 flex-col h-[calc(100vh-3rem)] md:h-screen">
      {currentConv ? (
        <>
          <ScrollArea className="flex-1 p-4 md:p-6 pb-0">
            <div className="max-w-3xl mx-auto space-y-5 pb-4">
              {currentConv.messages.map((msg, i) => (
                <ChatBubble key={msg.id} message={msg} index={i} />
              ))}
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-lg">
            <div className={`w-12 h-12 rounded-full ${theme.icon.accent} flex items-center justify-center mx-auto mb-4`}>
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              何でも聞いてください
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              社内の質問、業務サポート、情報検索などお手伝いします。
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
              {['有給休暇について', 'IT環境の設定', '会議室の予約', '売上レポート'].map(
                (prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-xs h-auto py-2.5 border-border/60"
                    onClick={() => {
                      const newId = createNewConversation()
                      navigate(`/chat/${newId}`)
                      setTimeout(() => sendMessage(prompt + 'について教えてください'), 50)
                    }}
                  >
                    <MessageSquare className="h-3 w-3 mr-1.5 shrink-0 text-muted-foreground" />
                    {prompt}
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
