import { useState, useRef, type KeyboardEvent, type ChangeEvent } from 'react'
import {
  ArrowUp,
  Plus,
  Mic,
  MicOff,
  X,
  Image as ImageIcon,
  FileText,
  Paperclip,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Attachment {
  id: string
  file: File
  preview?: string
  type: 'image' | 'file'
}

interface ChatInputProps {
  onSend: (message: string, attachments?: Attachment[]) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const hasContent = input.trim() || attachments.length > 0

  const handleSend = () => {
    if (!hasContent || disabled) return
    onSend(input.trim(), attachments.length > 0 ? attachments : undefined)
    setInput('')
    setAttachments([])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newAttachments: Attachment[] = Array.from(files).map((file) => {
      const isImage = file.type.startsWith('image/')
      return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: isImage ? URL.createObjectURL(file) : undefined,
        type: isImage ? 'image' : 'file',
      }
    })
    setAttachments((prev) => [...prev, ...newAttachments])
    e.target.value = ''
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const removed = prev.find((a) => a.id === id)
      if (removed?.preview) URL.revokeObjectURL(removed.preview)
      return prev.filter((a) => a.id !== id)
    })
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      setInput((prev) => prev + (prev ? ' ' : '') + '（音声入力のテキスト）')
    } else {
      setIsRecording(true)
    }
  }

  return (
    <div className="px-4 pb-4 pt-2">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={imageInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div
        className={cn(
          'max-w-3xl mx-auto rounded-2xl border bg-card transition-shadow duration-150',
          isFocused ? 'shadow-md ring-1 ring-foreground/10' : 'shadow-sm',
        )}
      >
        {/* Attachment previews */}
        {attachments.length > 0 && (
          <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto">
            {attachments.map((att) => (
              <div key={att.id} className="relative shrink-0 group">
                {att.type === 'image' && att.preview ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-border/60">
                    <img src={att.preview} alt={att.file.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg border border-border/60 flex flex-col items-center justify-center gap-1 bg-muted/30">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[9px] text-muted-foreground truncate max-w-14 px-1">
                      {att.file.name.split('.').pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeAttachment(att.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center gap-2 px-4 pt-3 pb-1">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs text-destructive">録音中...</span>
            <button
              onClick={toggleRecording}
              className="text-xs text-muted-foreground hover:text-foreground ml-auto"
            >
              停止
            </button>
          </div>
        )}

        {/* Input row */}
        <div className="flex items-center gap-1 p-2">
          {/* + button → dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground shrink-0"
                  disabled={disabled}
                />
              }
            >
              <Plus className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-48 mb-1">
              <DropdownMenuItem onClick={() => imageInputRef.current?.click()}>
                <ImageIcon className="h-4 w-4 mr-2" />
                画像をアップロード
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="h-4 w-4 mr-2" />
                ファイルを添付
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleRecording}>
                <Mic className="h-4 w-4 mr-2" />
                音声入力
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Globe className="h-4 w-4 mr-2" />
                Web検索（準備中）
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Textarea */}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="メッセージを入力..."
            disabled={disabled}
            className="flex-1 min-h-[36px] max-h-[160px] resize-none border-0 bg-transparent text-[15px] leading-[36px] focus-visible:ring-0 focus-visible:outline-none px-2 py-0 placeholder:text-muted-foreground/50"
            rows={1}
          />

          {/* Right: mic toggle or send */}
          {hasContent ? (
            <Button
              onClick={handleSend}
              disabled={disabled}
              size="icon"
              className="h-8 w-8 rounded-full shrink-0"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8 rounded-full shrink-0 transition-colors',
                isRecording
                  ? 'text-destructive bg-destructive/10 hover:bg-destructive/15'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              onClick={toggleRecording}
              disabled={disabled}
              title={isRecording ? '録音停止' : '音声入力'}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground/40 text-center mt-2">
        AIは間違うことがあります。重要な情報は確認してください。
      </p>
    </div>
  )
}
