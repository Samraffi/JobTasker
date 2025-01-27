'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import MobileNav from './MobileNav'

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/analyze', label: 'Analyze' },
    { href: '/projects', label: 'Projects' },
  ]

  return (
    <>
      {/* Десктопная навигация */}
      <nav className="hidden md:flex items-center space-x-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors ${pathname === href
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {label}
          </Link>
        ))}
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              Выйти
            </button>
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Войти
          </Link>
        )}
      </nav>

      {/* Мобильная навигация */}
      <MobileNav session={session} />
    </>
  )
}