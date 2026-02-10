import { generateActorTitle, generateActorDescription } from '@/lib/seo';

// Fetch actor data from TMDB
async function getPersonData(id) {
  const API_KEY = process.env.TMDB_API_KEY;
  
  const personRes = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`,
    { cache: 'no-store' }
  );
  
  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}`,
    { cache: 'no-store' }
  );
  
  const person = await personRes.json();
  const credits = await creditsRes.json();
  
  return { person, credits };
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const { person, credits } = await getPersonData(id);
  
  // Get most popular movie for "known for"
  const knownFor = credits.cast
    ?.sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3)
    .map(m => m.title)
    .join(', ');
  
  const title = generateActorTitle(person.name);
  const description = generateActorDescription(person.name, knownFor);
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : '/default-actor.jpg';
  
  return {
    title,
    description,
    openGraph: {
      title: person.name,
      description: description,
      images: [imageUrl],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: person.name,
      description: description,
      images: [imageUrl],
    },
  };
}

// Main page component
export default async function PersonPage({ params }) {
  const { id } = await params;
  const { person, credits } = await getPersonData(id);
  
  // Generate JSON-LD schema for Person
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    birthDate: person.birthday,
    birthPlace: person.place_of_birth,
    image: person.profile_path
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : undefined,
    jobTitle: person.known_for_department,
  };
  
  // Sort movies by popularity and get top 12
  const topMovies = credits.cast
    ?.sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12) || [];
  
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              {/* Profile Photo */}
              <div className="md:w-1/3">
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt={person.name}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No photo available</span>
                  </div>
                )}
              </div>
              
              {/* Profile Info */}
              <div className="md:w-2/3 p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {person.name}
                </h1>
                
                {person.known_for_department && (
                  <div className="mb-4">
                    <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                      {person.known_for_department}
                    </span>
                  </div>
                )}
                
                {/* Personal Details */}
                <div className="space-y-3 mb-6">
                  {person.birthday && (
                    <div>
                      <span className="font-semibold text-gray-700">Born:</span>{' '}
                      <span className="text-gray-600">
                        {new Date(person.birthday).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        {person.place_of_birth && ` in ${person.place_of_birth}`}
                      </span>
                    </div>
                  )}
                  
                  {person.deathday && (
                    <div>
                      <span className="font-semibold text-gray-700">Died:</span>{' '}
                      <span className="text-gray-600">
                        {new Date(person.deathday).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Biography */}
  {person.biography && (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <span className="h-6 w-1 rounded-full bg-indigo-600" />
      <h2 className="text-2xl font-semibold text-gray-700">
        Biography
      </h2>
    </div>

    <p className="leading-relaxed text-slate-700">
      {person.biography.length > 500
        ? person.biography.substring(0, 500) + "..."
        : person.biography}
    </p>
  </div>
)}



              </div>
            </div>
          </div>
          
          {/* Filmography */}
          {topMovies.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-700">Known For</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {topMovies.map((movie) => (
                  <div key={movie.id} className="group">
                    <a href={`/movie/${movie.id}`} className="block">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full rounded-lg shadow-md mb-2 group-hover:shadow-xl transition-shadow"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-gray-400 text-xs text-center px-2">
                            {movie.title}
                          </span>
                        </div>
                      )}
                      <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                        {movie.title}
                      </p>
                      {movie.character && (
                        <p className="text-xs text-gray-600">as {movie.character}</p>
                      )}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


