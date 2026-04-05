import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Message } from '@/data/mockConversations'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { mockUser } from '@/data/mockUser'
import {
  Bot,
  Copy,
  Check,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import { chatBubble } from '@/lib/motion'
import { useChatStore } from '@/stores/useChatStore'

interface ChatBubbleProps {
  message: Message
  index: number
}

export function ChatBubble({ message, index }: ChatBubbleProps) {
  const isUser = message.role === 'user'
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showRegenConfirm, setShowRegenConfirm] = useState(false)

  const { regenerateMessage, deleteMessage, editMessage } = useChatStore()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditContent(message.content)
  }

  const handleEditSave = () => {
    if (editContent.trim()) {
      editMessage(message.id, editContent.trim())
    }
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditContent(message.content)
  }

  return (
    <>
      <motion.div
        variants={chatBubble}
        initial="initial"
        animate="animate"
        transition={{ delay: index * 0.03 }}
        className={isUser ? "group flex gap-3 max-w-3xl ml-auto flex-row-reverse" : "group flex gap-3 max-w-3xl"}
      >
        {/* Avatar */}
        <div className="relative flex size-7 shrink-0 mt-0.5 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten">
          {isUser ? (
            <img src={mockUser.avatar} alt={mockUser.name} className="aspect-square size-full rounded-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center rounded-full bg-icon-accent text-icon-accent-fg">
              <Bot className="h-3.5 w-3.5" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className={isUser ? "flex-1 min-w-0 text-right" : "flex-1 min-w-0"}>
          {/* Role label */}
          <div className={isUser ? "text-xs text-muted-foreground mb-1 px-1 text-right" : "text-xs text-muted-foreground mb-1 px-1"}>
            {isUser ? 'あなた' : 'AI Assistant'}
          </div>

          {/* Bubble */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="flex field-sizing-content min-h-[60px] w-full rounded-xl border border-input bg-transparent px-2.5 py-2 text-[15px] transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                autoFocus
              />
              <div className="flex gap-1.5 justify-end">
                <button className="inline-flex shrink-0 items-center justify-center rounded-lg h-7 px-2.5 text-xs font-medium transition-all hover:bg-muted hover:text-foreground gap-1" onClick={handleEditCancel}>
                  <X className="h-3 w-3" /> キャンセル
                </button>
                <button className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground h-7 px-2.5 text-xs font-medium transition-all" onClick={handleEditSave}>
                  保存
                </button>
              </div>
            </div>
          ) : (
            <div className={isUser ? "inline-block text-left rounded-2xl px-4 py-2.5 leading-relaxed text-[15px] bg-bubble-user text-bubble-user-fg" : "inline-block text-left rounded-2xl px-4 py-2.5 leading-relaxed text-[15px] bg-bubble-ai text-bubble-ai-fg"}>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          )}

          {/* Action bar */}
          {!isEditing && (
            <div className={isUser ? "flex items-center gap-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 justify-end" : "flex items-center gap-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 justify-start"}>
              <button
                className="inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                onClick={handleCopy}
                title="コピー"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>

              {!isUser && (
                <>
                  <button
                    className="inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                    onClick={() => setShowRegenConfirm(true)}
                    title="再生成"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className={feedback === 'up' ? "inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted text-foreground transition-all" : "inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"}
                    onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                    title="良い回答"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className={feedback === 'down' ? "inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted text-foreground transition-all" : "inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"}
                    onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                    title="悪い回答"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>
                </>
              )}

              {isUser && (
                <button
                  className="inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  onClick={handleEdit}
                  title="編集"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}

              <button
                className="inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted text-muted-foreground hover:text-destructive transition-all"
                onClick={() => setShowDeleteConfirm(true)}
                title="削除"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              <span className="text-[10px] text-muted-foreground/40 ml-1">
                {new Date(message.timestamp).toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Confirm: Delete */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="メッセージを削除"
        description="このメッセージを削除しますか？この操作は取り消せません。"
        confirmLabel="削除"
        variant="destructive"
        onConfirm={() => deleteMessage(message.id)}
      />

      {/* Confirm: Regenerate */}
      <ConfirmDialog
        open={showRegenConfirm}
        onOpenChange={setShowRegenConfirm}
        title="回答を再生成"
        description="現在の回答を破棄して、新しい回答を生成しますか？"
        confirmLabel="再生成"
        onConfirm={() => regenerateMessage(message.id)}
      />
    </>
  )
}
