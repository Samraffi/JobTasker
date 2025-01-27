'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

interface MobileNavProps {
  session: Session | null
}

export default function MobileNav({ session }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/analyze', label: 'Analyze' },
    { href: '/projects', label: 'Projects' },
  ]

  return (
    <div className="md:hidden">
      {/* Гамбургер кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-2 text-sm ${pathname === href
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          {session ? (
            <>
              <div className="px-4 py-2 text-sm text-gray-600 border-t">
                {session.user?.email}
              </div>
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' })
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 border-t"
              onClick={() => setIsOpen(false)}
            >
              Войти
            </Link>
          )}
        </div>
      )}
    </div>
  )
}