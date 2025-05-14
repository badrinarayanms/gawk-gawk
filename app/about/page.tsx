import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, MousePointer, Globe, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-white md:text-4xl">
          About The National Gawk Contest
        </h1>

        <Card className="mb-8 bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-800">
          <CardHeader>
            <CardTitle className="text-center text-xl text-white md:text-2xl">🏆 Win Cash Prizes! 🏆</CardTitle>
            <CardDescription className="text-center text-gray-300">
              The top 3 clickers will win exclusive cash prizes in our national Gawk contest!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
            <div className="flex flex-col items-center p-4 bg-black/30 rounded-lg">
              <Trophy className="h-10 w-10 text-yellow-400 mb-2" />
              <div className="text-xl font-bold text-yellow-400">1st Place</div>
              <div className="text-2xl font-bold text-white">$1,000</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-black/30 rounded-lg">
              <Trophy className="h-8 w-8 text-gray-300 mb-2" />
              <div className="text-lg font-bold text-gray-300">2nd Place</div>
              <div className="text-xl font-bold text-white">$500</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-black/30 rounded-lg">
              <Trophy className="h-7 w-7 text-amber-700 mb-2" />
              <div className="text-lg font-bold text-amber-700">3rd Place</div>
              <div className="text-xl font-bold text-white">$250</div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-purple-950/80 border-purple-800">
            <CardHeader className="flex flex-row items-start space-y-0 pb-2">
              <div className="mr-4 rounded-full bg-purple-800/50 p-2">
                <MousePointer className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Simple and fun!</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Click the "Gawk Gawk" button as many times as you can! Each click is counted and tracked by your
                account. The more you click, the higher your chances of winning. It's that simple!
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Create an account to start tracking your clicks
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Click the button as many times as possible
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Check the leaderboard to see your ranking
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Win cash prizes if you're in the top 3!
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-purple-950/80 border-purple-800">
            <CardHeader className="flex flex-row items-start space-y-0 pb-2">
              <div className="mr-4 rounded-full bg-purple-800/50 p-2">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Country Competition</CardTitle>
                <CardDescription>Represent your nation!</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Not only are you competing individually, but you're also representing your country! Each click
                contributes to your country's total on the global leaderboard. Help your nation rise to the top!
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Select your country before clicking
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Each click adds to your country's total
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Check the country leaderboard to see your nation's ranking
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Compete with friends to boost your country's position!
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-purple-950/80 border-purple-800 md:col-span-2">
            <CardHeader className="flex flex-row items-start space-y-0 pb-2">
              <div className="mr-4 rounded-full bg-purple-800/50 p-2">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Contest Rules</CardTitle>
                <CardDescription>Fair play for everyone</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                The National Gawk Contest is designed to be fun and fair for everyone. Here are the official rules:
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Contest runs until December 31, 2023
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  One account per person (multiple accounts will be disqualified)
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Automated clicking is not allowed and will result in disqualification
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Winners will be contacted via email for prize distribution
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Prizes: 1st Place - $1,000, 2nd Place - $500, 3rd Place - $250
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-400">•</span>
                  Contest organizers' decision is final in case of disputes
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
