import { useState } from 'react'
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Send,
  Check,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const guides = [
  {
    title: '基本的な使い方',
    description: 'チャットボットの基本操作',
    steps: ['「チャット」を選択', '「新しいチャット」をクリック', 'テキスト入力欄に質問を入力', 'Enter で送信'],
  },
  {
    title: '効果的な質問',
    description: 'より正確な回答を得るコツ',
    steps: ['具体的に質問する', '背景情報を添える', '一度に一つの質問にフォーカス', '不足があれば続けて質問'],
  },
  {
    title: '会話履歴の活用',
    description: '過去の会話を効率的に参照',
    steps: ['「会話履歴」を選択', 'キーワードで検索', 'カテゴリで絞り込み', 'クリックで過去の会話を表示'],
  },
]

const faqs = [
  { question: 'AIの回答は正確ですか？', answer: 'AIは社内データベースに基づいて回答しますが、100%の正確性を保証するものではありません。重要な判断に関わる場合は、必ず担当部署に確認してください。' },
  { question: '会話の内容は他の人に見られますか？', answer: 'いいえ、会話内容は本人のみアクセス可能です。管理者も個別の会話内容を閲覧することはできません。' },
  { question: '対応している言語は？', answer: '現在は日本語と英語に対応しています。' },
  { question: '利用可能時間に制限はありますか？', answer: '24時間365日ご利用いただけます。定期メンテナンス時（毎月第1日曜日 2:00〜4:00）は一時的に利用できない場合があります。' },
  { question: 'フィードバックはどこに送ればいい？', answer: 'このページ下部のフォームか、Slackの #ai-assistant-feedback チャンネルで受け付けています。' },
]

export function Help() {
  const [contactSent, setContactSent] = useState(false)
  const [contactForm, setContactForm] = useState({ subject: '', category: '', message: '' })

  const handleSubmit = () => {
    setContactSent(true)
    setContactForm({ subject: '', category: '', message: '' })
    setTimeout(() => setContactSent(false), 3000)
  }

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">ヘルプ</h1>
          <p className="text-sm text-muted-foreground mt-1">使い方やよくある質問</p>
        </div>

        {/* Guides */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> ガイド
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {guides.map((guide, i) => (
              <Card key={guide.title} className="border-border/60">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="text-xs text-muted-foreground mb-1">Step {i + 1}</div>
                  <CardTitle className="text-sm">{guide.title}</CardTitle>
                  <CardDescription className="text-xs">{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <ul className="space-y-1.5">
                    {guide.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" /> {step}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" /> よくある質問
          </h2>
          <Card className="border-border/60">
            <CardContent className="p-0">
              <Accordion className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="px-4">
                    <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-3">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" /> お問い合わせ
          </h2>
          <Card className="border-border/60">
            <CardContent className="pt-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs">件名</Label>
                  <Input
                    id="subject" placeholder="件名"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm((f) => ({ ...f, subject: e.target.value }))}
                    className="rounded-lg h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">カテゴリ</Label>
                  <Select
                    value={contactForm.category}
                    onValueChange={(val) => setContactForm((f) => ({ ...f, category: val ?? '' }))}
                  >
                    <SelectTrigger className="rounded-lg h-9"><SelectValue placeholder="選択" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="question">質問</SelectItem>
                      <SelectItem value="request">機能リクエスト</SelectItem>
                      <SelectItem value="bug">不具合</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs">メッセージ</Label>
                <Textarea
                  id="message" placeholder="内容を入力..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                  className="rounded-lg min-h-[100px]" rows={4}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={!contactForm.subject || !contactForm.category || !contactForm.message}
                  className="rounded-lg min-w-24 gap-1.5" size="sm"
                >
                  {contactSent ? <><Check className="h-3.5 w-3.5" /> 送信済み</> : <><Send className="h-3.5 w-3.5" /> 送信</>}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="pb-8" />
      </div>
    </div>
  )
}
