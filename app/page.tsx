import { Suspense } from "react"
import GawkButton from "@/components/gawk-button"
import Leaderboard from "@/components/leaderboard"
import Link from "next/link"

export default function Home() {
  return (
    <>
      
      {/* Main content */}
      <main className="flex min-h-screen flex-col items-center justify-start bg-black p-4 md:p-8">
        <h1 className="mb-8 mt-12 text-center text-4xl font-extrabold uppercase tracking-wider text-white md:text-6xl">
          Gawk Gawk!
        </h1>

        <div className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-12">
          <Suspense fallback={<div className="h-48 w-48 animate-pulse rounded-full bg-gray-800" />}>
            <GawkButton />
          </Suspense>

          <div className="w-full max-w-3xl">
            <h2 className="mb-4 text-xl font-bold text-white">Leaderboard</h2>
            <Leaderboard />
          </div>
        </div>

        <footer className="mt-10 pb-4 text-center text-xs text-gray-500">
          © 2025 Gawkify ·{" "}
          <a href="/" className="text-blue-500 hover:underline">Privacy Policy</a> ·{" "}
          <a href="/" className="text-blue-500 hover:underline">Terms</a>
        </footer>
      </main>
    </>
  )
}
