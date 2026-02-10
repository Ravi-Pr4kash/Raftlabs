import Link from "next/link";

export const metadata = {
  title: 'RaftMovies - Discover Popular Movies, Reviews & Cast Information',
  description: 'Browse the most popular movies, read reviews, explore cast details, and find where to watch. Your ultimate movie database with ratings, trailers, and more.',
  openGraph: {
    title: 'RaftMovies - Popular Movies Database',
    description: 'Discover trending movies, ratings, cast, and reviews',
    type: 'website',
  },
};

async function getPopularMovies() {
  const API_KEY = process.env.TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();
  return data.results || [];
}

export default async function HomePage() {
  const movies = await getPopularMovies();

    const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MovieSEO',  // Change to 'RaftMovies'
    url: 'https://your-domain.com',  // Change to 'https://raftlabs-one.vercel.app'
    description: 'Discover popular movies, reviews, and cast information',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Discover Popular Movies</h1>
          <p className="text-xl text-blue-100">
            Explore trending films, read reviews, and find your next favorite
            movie
          </p>
        </div>
      </div>

      {/* MOVIE GRID */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Trending Now
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => {
            const movieUrl = `/movie/${movie.id}`;
            const posterUrl =
              "https://image.tmdb.org/t/p/w342" + movie.poster_path;

            return (
              <Link
                key={movie.id}
                href={movieUrl}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {movie.poster_path ? (
                  <img
                    src={posterUrl}
                    alt={`${movie.title} poster`}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No poster</span>
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {movie.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-semibold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>

                    {movie.release_date && (
                      <span>
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SEO CONTENT */}
      <div className="bg-gray-50 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Ultimate Movie Database
          </h2>

          <div className="text-gray-700 space-y-4">
            <p>
              Welcome to RaftMovies, your comprehensive source for discovering
              the latest and most popular movies. We provide detailed
              information about films, including cast members, crew details,
              user ratings, and professional reviews.
            </p>

            <p>
              Our database features thousands of movies across all genres 
              from action packed blockbusters to indie darlings and classic
              cinema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
