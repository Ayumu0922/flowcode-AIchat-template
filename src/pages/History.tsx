import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, MessageSquare, Calendar, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useChatStore } from '@/stores/useChatStore'

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
            <input
              placeholder="検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full min-w-0 rounded-lg border border-border/60 bg-muted/30 pl-9 pr-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            />
          </div>
          <Select value={categoryFilter} onValueChange={(val) => val && setCategoryFilter(val)}>
            <SelectTrigger>
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
              className="w-full text-left px-3 py-3 rounded-lg hover:bg-surface-hover transition-colors flex items-start gap-3"
              onClick={() => handleOpen(conv.id)}
            >
              <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground truncate">{conv.title}</span>
                  <span className="inline-flex h-4 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl bg-secondary text-secondary-foreground px-2 py-0.5 text-[10px] font-normal whitespace-nowrap">
                    {conv.category}
                  </span>
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
              <button
                className="mt-2 text-xs inline-flex items-center justify-center rounded-lg h-7 px-2.5 font-medium transition-all hover:bg-muted hover:text-foreground"
                onClick={() => { setSearch(''); setCategoryFilter('all') }}
              >
                クリア
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
