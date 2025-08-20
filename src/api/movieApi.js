const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjcwMzI5OGQ4MGUwYzU4YWY2MjI0YjBlMjUxYTExNSIsIm5iZiI6MTc1MDQ1ODc2My4zODgsInN1YiI6IjY4NTVlMThiYWZmNTNjOWQyOTRiY2ExNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vaZlJ-GOkwCDO8Q8j7yVJ3X8DKNB5ywzGNI_OLm7UW0",
  },
};

export async function getLandingMovie() {
  const endpoint = "/discover/movie";
  const query =
    "?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const url = `${BASE_URL + endpoint + query}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results[1];
}

export async function getMoviesByGenreId(id, pageNum = 1) {
  const endpoint = "/discover/movie";
  const query =
    "?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc";
  const genre = `&with_genres=${id}`;
  const page = `&page=${pageNum}`;
  const url = `${BASE_URL + endpoint + query + genre + page}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getMoviesByFilter(filtered) {
  const endpoint = "/discover/movie";
  const query = "?include_adult=false&include_video=false&language=en-US";
  const url = `${BASE_URL + endpoint + query + filtered}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getMovieDetailById(id) {
  const endpoint = "/movie";
  const query = "?language=en-US";
  const url = `${BASE_URL + endpoint}/${id}${query}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

export async function getMovieReviewById(id) {
  const endpoint = "/movie";
  const query = "reviews?language=en-US&page=1";
  const url = `${BASE_URL + endpoint}/${id}/${query}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getSimilarMoviesById(id) {
  const endpoint = "/movie";
  const query = "similar?language=en-US&page=1";
  const url = `${BASE_URL + endpoint}/${id}/${query}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getDailyTrendingMovies() {
  const endpoint = "/trending/movie";
  const query = "?language=en-US";
  const url = `${BASE_URL + endpoint}/day${query}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getWeeklyTrendingMovies() {
  const endpoint = "/trending/movie";
  const query = "?language=en-US";
  const url = `${BASE_URL + endpoint}/week${query}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getUpcomingMovies() {
  const endpoint = "/movie/upcoming";
  const query = "?language=en-US";
  const url = `${BASE_URL + endpoint + query}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getMovies() {
  const genres = [
    { id: 28, genre: "action" },
    { id: 35, genre: "comedy" },
    { id: 9648, genre: "mystery" },
    { id: 53, genre: "thriller" },
    { id: 14, genre: "fantasy" },
  ];

  const data = await Promise.all(
    genres.map(async (item) => {
      return { movies: await getMoviesByGenreId(item.id), genre: item.genre };
    })
  );

  return data;
}
