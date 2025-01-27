import Link from 'next/link'
import Navigation from './Navigation'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            TaskJobber
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  )
}
