import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, MessageSquare, Calendar, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useChatStore } from '@/stores/useChatStore'
import { theme } from '@/lib/theme'

export function History() {
  const navigate = useNavigate()
  const conversations = useChatStore((s) => s.conversations)
  const setActiveConversation = useChatStore((s) => s.setActiveConversation)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = [...new Set(conversations.map((c) => c.category))]

  const filtered = conversations.filter((conv) => {
    const matchesSearch =
      !search ||
      conv.title.toLowerCase().includes(search.toLowerCase()) ||
      conv.preview.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      categoryFilter === 'all' || conv.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleOpen = (id: string) => {
    setActiveConversation(id)
    navigate(`/chat/${id}`)
  }

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <div className="max-w-3xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">会話履歴</h1>
          <p className="text-sm text-muted-foreground mt-1">過去の会話を検索・閲覧できます</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-lg border-border/60 bg-muted/30 h-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={(val) => val && setCategoryFilter(val)}>
            <SelectTrigger className="w-full sm:w-40 rounded-lg border-border/60 h-9">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              <SelectValue placeholder="カテゴリ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-muted-foreground">{filtered.length} 件</p>

        {/* List */}
        <div className="space-y-0.5">
          {filtered.map((conv) => (
            <button
              key={conv.id}
              className={`w-full text-left px-3 py-3 rounded-lg ${theme.surface.hover} transition-colors flex items-start gap-3`}
              onClick={() => handleOpen(conv.id)}
            >
              <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground truncate">{conv.title}</span>
                  <Badge variant="secondary" className="text-[10px] shrink-0 font-normal h-4">
                    {conv.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.preview}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                    <Calendar className="h-3 w-3" />
                    {new Date(conv.createdAt).toLocaleDateString('ja-JP', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60">
                    {conv.messages.length} メッセージ
                  </span>
                </div>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-8 w-8 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">該当なし</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs"
                onClick={() => { setSearch(''); setCategoryFilter('all') }}
              >
                クリア
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
