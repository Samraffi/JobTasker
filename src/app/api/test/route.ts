import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Проверяем подключение, получая количество пользователей
    const userCount = await prisma.user.count()
    return NextResponse.json({ status: 'Connected', userCount })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { status: 'Error', message: 'Could not connect to database' },
      { status: 500 }
    )
  }
}
