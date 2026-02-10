// SEO utility functions

export function generateMovieTitle(movieTitle) {
  return `${movieTitle} - Cast, Reviews & Where to Watch | RaftMovies`;
}

export function generateMovieDescription(movie) {
  const year = movie.release_date?.split('-')[0] || 'N/A';
  const rating = movie.vote_average?.toFixed(1) || 'N/A';
  
  return `${movie.title} (${year}) - Rated ${rating}/10. ${movie.overview?.substring(0, 120)}... Find cast, reviews, and streaming options.`;
}

export function generateActorTitle(actorName) {
  return `${actorName} - Movies, Biography & Filmography | RaftMovies`;
}

export function generateActorDescription(actorName, knownFor) {
  return `Explore ${actorName}'s complete filmography, biography, and best movies. Known for ${knownFor || 'outstanding performances'}.`;
}

export function generateMovieSchema(movie) {
  const year = movie.release_date?.split('-')[0];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.overview,
    datePublished: movie.release_date,
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: movie.vote_average,
      ratingCount: movie.vote_count,
      bestRating: 10,
      worstRating: 0
    }
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}