export default async function handler(req, res) {
  const API_KEY = process.env.TMDB_API_KEY;
  
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    
    res.status(200).json({
      success: true,
      movieCount: data.results?.length || 0,
      firstMovie: data.results?.[0]?.title || 'No data'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}