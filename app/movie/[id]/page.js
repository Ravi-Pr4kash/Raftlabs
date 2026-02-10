import { generateMovieTitle, generateMovieDescription, generateMovieSchema } from '@/lib/seo';

// This function runs on the server for each request (SSR)
async function getMovieData(id) {
  const API_KEY = process.env.TMDB_API_KEY;
  
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    { cache: 'no-store' } // Ensures fresh data on each request
  );
  
  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
    { cache: 'no-store' }
  );
  
  const movie = await movieRes.json();
  const credits = await creditsRes.json();
  
  return { movie, credits };
}

// Generate metadata for SEO (runs on server)
export async function generateMetadata({ params }) {
  const { id } = await params; // FIX: Added await here
  const { movie } = await getMovieData(id);
  
  const title = generateMovieTitle(movie.title);
  const description = generateMovieDescription(movie);
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/default-movie.jpg';
  
  return {
    title,
    description,
    openGraph: {
      title: movie.title,
      description: description,
      images: [imageUrl],
      type: 'video.movie',
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: description,
      images: [imageUrl],
    },
  };
}

// Main page component
export default async function MoviePage({ params }) {
  const { id } = await params; // FIX: Added await here
  const { movie, credits } = await getMovieData(id);
  
  // Generate JSON-LD schema
  const movieSchema = generateMovieSchema(movie);
  
  // Get top 5 cast members
  const topCast = credits.cast?.slice(0, 5) || [];
  
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieSchema) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Movie Poster */}
              <div className="md:w-1/3">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No poster available</span>
                  </div>
                )}
              </div>
              
              {/* Movie Info */}
              <div className="md:w-2/3 p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {movie.title}
                </h1>
                
                {movie.tagline && (
                  <p className="text-xl text-gray-600 italic mb-4">
                    "{movie.tagline}"
                  </p>
                )}
                
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-2xl mr-2">★</span>
                    <span className="text-xl font-semibold">
                      {movie.vote_average?.toFixed(1)}/10
                    </span>
                  </div>
                  
                  {movie.release_date && (
                    <div className="text-gray-600">
                      Released: {new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                  
                  {movie.runtime && (
                    <div className="text-gray-600">
                      Runtime: {movie.runtime} min
                    </div>
                  )}
                </div>
                
                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {movie.overview || 'No overview available.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cast Section */}
          {topCast.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Top Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {topCast.map((actor) => (
                  <div key={actor.id} className="text-center">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full rounded-lg shadow-md mb-2"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No photo</span>
                      </div>
                    )}
                    <p className="font-semibold text-sm">{actor.name}</p>
                    <p className="text-xs text-gray-600">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Additional Info */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Movie Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {movie.budget > 0 && (
                <div>
                  <span className="font-semibold">Budget:</span>{' '}
                  ${movie.budget.toLocaleString()}
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div>
                  <span className="font-semibold">Revenue:</span>{' '}
                  ${movie.revenue.toLocaleString()}
                </div>
              )}
              
              {movie.status && (
                <div>
                  <span className="font-semibold">Status:</span> {movie.status}
                </div>
              )}
              
              {movie.original_language && (
                <div>
                  <span className="font-semibold">Original Language:</span>{' '}
                  {movie.original_language.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}