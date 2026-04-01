import { motion } from 'framer-motion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bot } from 'lucide-react'
import { typingDot } from '@/lib/motion'
import { theme } from '@/lib/theme'

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex gap-3 max-w-3xl"
    >
      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
        <AvatarFallback className={theme.icon.accent}>
          <Bot className="h-3.5 w-3.5" />
        </AvatarFallback>
      </Avatar>

      <div className="bg-bubble-ai rounded-2xl px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
            {...typingDot(i)}
          />
        ))}
      </div>
    </motion.div>
  )
}
