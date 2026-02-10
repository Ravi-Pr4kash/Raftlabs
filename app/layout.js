import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://raftlabs-one.vercel.app'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-blue-600">
                🎬 RaftMovies
              </a>
              <div className="flex gap-6">
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </a>
                <a href="/movie/550" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Movies
                </a>
                <a href="/person/287" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Actors
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        {children}
        
        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="mb-2">© 2026 RaftMovies - Your Ultimate Movie Database</p>
            <p className="text-sm text-gray-500">
              Data provided by The Movie Database (TMDB)
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}