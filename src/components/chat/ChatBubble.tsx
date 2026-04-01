import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Message } from '@/data/mockConversations'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
import { cn } from '@/lib/utils'
import { chatBubble } from '@/lib/motion'
import { theme } from '@/lib/theme'
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
        className={cn(
          'group flex gap-3 max-w-3xl',
          isUser ? 'ml-auto flex-row-reverse' : '',
        )}
      >
        {/* Avatar */}
        <Avatar className="h-7 w-7 shrink-0 mt-0.5">
          {isUser ? (
            <>
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className={cn(theme.icon.muted, 'text-[10px] font-medium')}>
                {mockUser.name.slice(0, 1)}
              </AvatarFallback>
            </>
          ) : (
            <AvatarFallback className={theme.icon.accent}>
              <Bot className="h-3.5 w-3.5" />
            </AvatarFallback>
          )}
        </Avatar>

        {/* Content */}
        <div className={cn('flex-1 min-w-0', isUser ? 'text-right' : '')}>
          {/* Role label */}
          <div className={cn('text-xs text-muted-foreground mb-1 px-1', isUser ? 'text-right' : '')}>
            {isUser ? 'あなた' : 'AI Assistant'}
          </div>

          {/* Bubble */}
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[60px] rounded-xl text-[15px]"
                autoFocus
              />
              <div className="flex gap-1.5 justify-end">
                <Button variant="ghost" size="sm" onClick={handleEditCancel} className="h-7 text-xs gap-1">
                  <X className="h-3 w-3" /> キャンセル
                </Button>
                <Button size="sm" onClick={handleEditSave} className="h-7 text-xs">
                  保存
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                'inline-block text-left rounded-2xl px-4 py-2.5 leading-relaxed',
                theme.text.body,
                isUser ? theme.bubble.user : theme.bubble.ai,
              )}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          )}

          {/* Action bar */}
          {!isEditing && (
            <div
              className={cn(
                'flex items-center gap-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150',
                isUser ? 'justify-end' : 'justify-start',
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
                title="コピー"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>

              {!isUser && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground"
                    onClick={() => setShowRegenConfirm(true)}
                    title="再生成"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-7 w-7 rounded-md',
                      feedback === 'up' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                    onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                    title="良い回答"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-7 w-7 rounded-md',
                      feedback === 'down' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                    onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                    title="悪い回答"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}

              {isUser && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground"
                  onClick={handleEdit}
                  title="編集"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md text-muted-foreground hover:text-destructive"
                onClick={() => setShowDeleteConfirm(true)}
                title="削除"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>

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
