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

export async function getMoviesByGenreId(id) {
  const endpoint = "/discover/movie";
  const query =
    "?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const genre = `&with_genres=${id}`;
  const url = `${BASE_URL + endpoint + query + genre}`;

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

// https://developer.themoviedb.org/reference/discover-movie  --> movie basic information
// {
//   "page": 1,
//   "results": [
//     {
//       "adult": false,
//       "backdrop_path": "/iZLqwEwUViJdSkGVjePGhxYzbDb.jpg",
//       "genre_ids": [
//         878,
//         53
//       ],
//       "id": 755898,
//       "original_language": "en",
//       "original_title": "War of the Worlds",
//       "overview": "Will Radford is a top cyber-security analyst for Homeland Security who tracks potential threats to national security through a mass surveillance program, until one day an attack by an unknown entity leads him to question whether the government is hiding something from him... and from the rest of the world.",
//       "popularity": 701.6547,
//       "poster_path": "/yvirUYrva23IudARHn3mMGVxWqM.jpg",
//       "release_date": "2025-07-29",
//       "title": "War of the Worlds",
//       "video": false,
//       "vote_average": 4.653,
//       "vote_count": 49
//     },

// https://developer.themoviedb.org/reference/movie-popular-list  --> popular movie list
// {
//   "page": 1,
//   "results": [
//     {
//       "adult": false,
//       "backdrop_path": "/iZLqwEwUViJdSkGVjePGhxYzbDb.jpg",
//       "genre_ids": [
//         878,
//         53
//       ],
//       "id": 755898,
//       "original_language": "en",
//       "original_title": "War of the Worlds",
//       "overview": "Will Radford is a top cyber-security analyst for Homeland Security who tracks potential threats to national security through a mass surveillance program, until one day an attack by an unknown entity leads him to question whether the government is hiding something from him... and from the rest of the world.",
//       "popularity": 701.6547,
//       "poster_path": "/yvirUYrva23IudARHn3mMGVxWqM.jpg",
//       "release_date": "2025-07-29",
//       "title": "War of the Worlds",
//       "video": false,
//       "vote_average": 4.526,
//       "vote_count": 38
//     },

// https://developer.themoviedb.org/reference/movie-similar  --> similar movies (use for recommendations when specific movie is clicked)
// {
//   "page": 1,
//   "results": [
//     {
//       "adult": false,
//       "backdrop_path": "/yXTie4uyhe1vZlmbdW7k8aoRkuT.jpg",
//       "genre_ids": [
//         27,
//         53
//       ],
//       "id": 12262,
//       "original_language": "en",
//       "original_title": "The Hills Have Eyes",
//       "overview": "Taking an ill-advised detour en-route to California, the Carter family soon run into trouble when their RV breaks down in the middle of the desert. Stranded, they find themselves at the mercy of monstrous cannibals lurking in the surrounding hills.",
//       "popularity": 1.8689,
//       "poster_path": "/1G2DBIEkoS0JdCiOFIeR3mD8ROE.jpg",
//       "release_date": "1977-07-22",
//       "title": "The Hills Have Eyes",
//       "video": false,
//       "vote_average": 6.1,
//       "vote_count": 935
//     },

// https://developer.themoviedb.org/reference/movie-reviews  --> movie reviews
// {
//   "id": 12262,
//   "page": 1,
//   "results": [
//     {
//       "author": "John Chard",
//       "author_details": {
//         "name": "",
//         "username": "John Chard",
//         "avatar_path": "/utEXl2EDiXBK6f41wCLsvprvMg4.jpg",
//         "rating": 6
//       },
//       "content": "You folks. Stay on the main road now you hear!\r\n\r\nAfter having announced himself to the horror hordes with The Last House on the Left, Craven's next horror pick would be this, The Hills Have Eyes, another slab of grit and grime. \r\n\r\nA nuclear family head across the desert in their giant trailer only to break down and find there's beasties in the hills hungry for their blood.\r\n\r\nIt has become very much a popular cult pic with Craven fans, which is understandable given the brisk pacing, moments of intensity and suspense, while the allegories and messages are smartly inserted. But the low budget does affect the product, it looks cheap and renders much of the violence and sexual aspects (implied or otherwise) as being not very frightening or stomach churning. While some of the acting is very poor, further adding a cartoonish feel to what should have been a nerve shredding experience.\r\n\r\nAbove average for sure, but not the masterpiece some would have you believe. 6/10",
//       "created_at": "2015-10-30T19:58:42.254Z",
//       "id": "5633cbf29251414ab7013bac",
//       "updated_at": "2024-05-16T15:22:11.884Z",
//       "url": "https://www.themoviedb.org/review/5633cbf29251414ab7013bac"
//     },
