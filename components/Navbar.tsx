// components/Navbar.tsx
'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-xl font-bold">Gawkify</div>
        <div className="flex space-x-6 text-sm md:text-base">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/about" className="hover:text-blue-400">About</Link>
          <Link href="/admin" className="hover:text-blue-400">Admin</Link>
        </div>
      </div>
    </nav>
  )
}


