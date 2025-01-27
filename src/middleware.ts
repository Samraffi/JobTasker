// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedPaths = ['/projects']
const publicPaths = ['/auth/signin', '/api/auth', '/favicon.ico', '/_next', '/']

const isProtectedPath = (path: string) =>
  protectedPaths.some(prefix => path.startsWith(prefix))

const isPublicPath = (path: string) =>
  publicPaths.some(prefix => {
    // Для корневого пути проверяем точное совпадение
    if (prefix === '/') {
      return path === '/'
    }
    // Для остальных путей проверяем начало строки
    return path.startsWith(prefix)
  })

  export async function middleware(request: NextRequest) {
    try {
      const path = request.nextUrl.pathname
      console.log('\n=== MIDDLEWARE START ===')
      console.log('📍 Requested Path:', path)
      
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
      })
      console.log('🎫 Token present?', !!token)
  
      // Обновляем проверку, чтобы включить оба пути
      if (token && (path === '/auth/signin' || path === '/api/auth/signin')) {
        console.log('🔄 Authorized user redirected from signin page')
        return NextResponse.redirect(new URL('/', request.url))
      }

      // Проверяем публичный ли путь
      const isPublic = isPublicPath(path)
      if (isPublic) {
        return NextResponse.next()
      }
  
      // Для защищенных путей
      const isProtected = isProtectedPath(path)
      if (isProtected && !token) {
        console.log('❌ No token found - redirecting to signin')
        const signInUrl = new URL('/auth/signin', request.url)
        signInUrl.searchParams.set('callbackUrl', path)
        return NextResponse.redirect(signInUrl)
      }
  
      return NextResponse.next()
    } catch (error) {
      console.error('🚨 Middleware Error:', error)
      return NextResponse.next()
    }
  }

export const config = {
  matcher: [
    // Match all paths
    '/:path*',
    // Except
    '/((?!_next/static|_next/image|favicon\\.ico).*)'
  ],
}