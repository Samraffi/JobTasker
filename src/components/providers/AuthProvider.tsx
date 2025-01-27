'use client' // Указывает, что это клиентский компонент

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth' // Добавим импорт типа Session

export default function AuthProvider({ 
  children,
  session 
}: { 
  children: React.ReactNode
  session: Session | null // Исправляем any на правильный тип
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}