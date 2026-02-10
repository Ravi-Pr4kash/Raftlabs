# MovieSEO - Next.js Movie Database with SEO Optimization

A server-side rendered (SSR) movie database built with Next.js, featuring programmatic SEO pages optimized for search engines.

## 🎯 Project Overview

MovieSEO is a comprehensive movie information platform that leverages Next.js for server-side rendering and implements SEO best practices including JSON-LD schema markup, OpenGraph tags, and optimized meta descriptions.

## 🚀 Features

- **Server-Side Rendering (SSR)** - All pages are rendered on the server for optimal SEO
- **Programmatic SEO Pages** - Dynamic pages generated from TMDB API data
- **JSON-LD Schema Markup** - Structured data for movies, actors, and website
- **OpenGraph & Twitter Cards** - Social media optimization
- **Responsive Design** - Mobile-first, fully responsive UI
- **SEO-Optimized URLs** - Clean, descriptive URLs for all pages

## Page Types

1. **Homepage** - Popular movies listing with trending content
2. **Movie Detail Pages** - Individual movie information with cast, ratings, and reviews
3. **Actor Profile Pages** - Actor biographies with filmography

## SEO Implementation

### Keyword Research
Target keywords identified through Google Keyword Planner:
- `[movie-title] review` - High search volume
- `[movie-title] cast` - High search volume
- `[actor-name] movies` - Medium search volume
- `watch [movie-title]` - High intent

### SEO Features
-  Dynamic meta titles and descriptions
-  JSON-LD structured data (Movie, Person, WebSite schemas)
-  OpenGraph metadata for social sharing
-  Twitter Card optimization
-  Semantic HTML structure
-  Image alt tags
-  Proper heading hierarchy (H1, H2, H3)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **Data Source:** The Movie Database (TMDB) API
- **SEO:** next-seo, schema-dts

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ravi-Pr4kash/Raftlabs
cd seo-nextjs-project
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the root directory:
```
TMDB_API_KEY=your_api_key_here
```

4. Get your TMDB API key:
   - Sign up at https://www.themoviedb.org/
   - Go to Settings → API
   - Request API key (choose Developer)
   - Copy the API Key (v3 auth)

5. Run the development server:
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Key: `TMDB_API_KEY`
   - Value: Your TMDB API key
6. Click "Deploy"

Your site will be live in minutes!

## Project Structure
```
seo-nextjs-project/
├── app/
│   ├── movie/[id]/
│   │   └── page.js          # Movie detail pages
│   ├── person/[id]/
│   │   └── page.js          # Actor profile pages
│   ├── layout.js            # Root layout with navigation
│   ├── page.js              # Homepage
│   └── globals.css          # Global styles
├── lib/
│   └── seo.js               # SEO utility functions
├── pages/
│   └── api/
│       └── test-tmdb.js     # API test endpoint
├── KEYWORDS.md              # Keyword research documentation
├── .env.local               # Environment variables (not in git)
└── README.md
```

## Key Components

### SEO Utilities (`lib/seo.js`)
- `generateMovieTitle()` - Creates SEO-friendly movie titles
- `generateMovieDescription()` - Generates meta descriptions
- `generateMovieSchema()` - Creates JSON-LD schema for movies
- `generateActorTitle()` - Creates SEO-friendly actor titles
- `generateActorDescription()` - Generates actor meta descriptions

### Dynamic Pages
- `/movie/[id]` - Movie details with SSR
- `/person/[id]` - Actor profiles with SSR
- `/` - Homepage with popular movies

## 📈 SEO Performance

Lighthouse scores (as of testing):
- SEO: XX/100
- Performance: XX/100
- Best Practices: XX/100
- Accessibility: XX/100

## Key SEO Elements

### Movie Pages
```javascript
- Title: "[Movie Title] - Cast, Reviews & Where to Watch | MovieSEO"
- Meta Description: Dynamic based on movie data
- JSON-LD: Movie schema with ratings, cast, release date
- OpenGraph: Title, description, poster image
```

### Actor Pages
```javascript
- Title: "[Actor Name] - Movies, Biography & Filmography | MovieSEO"
- Meta Description: Dynamic based on actor's known films
- JSON-LD: Person schema with biography, filmography
- OpenGraph: Title, description, profile image
```



## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Built with [Next.js](https://nextjs.org/)
```
