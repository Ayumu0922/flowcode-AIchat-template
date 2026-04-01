export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  department: string
}

export const mockUser: User = {
  id: 'user-001',
  name: '田中 太郎',
  email: 'tanaka@example.co.jp',
  avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=TT&backgroundColor=d97706&textColor=ffffff',
  role: 'シニアエンジニア',
  department: '開発部',
}
