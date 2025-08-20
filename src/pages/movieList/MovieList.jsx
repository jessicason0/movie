import React, { useEffect, useState } from "react";
import "./movieList.css";
import { getMoviesByFilter, getMoviesByGenreId } from "../../api/movieApi";
import { Link, useNavigate, useSearchParams } from "react-router";
import { genreData } from "../../lib/genreData";
import MovieCard from "../../components/MovieCard";

const maxPage = 20;

function MovieList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const genre = searchParams.get("genre") || 28;
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "popularity.desc";

  const [movieData, setMovieData] = useState(null);
  //   const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const genreQuery = `&with_genres=${genre}`;
    const pageQuery = `&page=${page}`;
    const sortQuery = `&sort_by=${sort}`;

    const query = genreQuery + pageQuery + sortQuery;

    getMoviesByFilter(query).then((data) => setMovieData(data));
  }, [genre, page, sort]);

  function detailPage(id) {
    navigate(`/details/${id}`);
  }

  //   console.log(movieData);

  //   function prevPage() {
  //     if (Number(page) <= 1) navigate(`/movies?genre=${genre}&page=${maxPage}`);
  //     else navigate(`/movies?genre=${genre}&page=${Number(page) - 1}`);
  //   }

  //   function nextPage() {
  //     if (Number(page) >= maxPage) navigate(`/movies?genre=${genre}&page=${1}`);
  //     else navigate(`/movies?genre=${genre}&page=${Number(page) + 1}`);
  //   }

  function navigatePage(pg) {
    navigate(`/movies?genre=${genre}&page=${pg}&sort=${sort}`);
  }

  function handleFilter(query) {
    navigate(`/movies?genre=${genre}&page=${1}&sort=${query}`);
  }

  const sortBtnLayout = [
    { label: "Popular", query: "popularity.desc" },
    { label: "New Release", query: "primary_release_date.desc" },
    { label: "Title (A-Z)", query: "title.asc" },
    { label: "Title (Z-A)", query: "title.desc" },
  ];

  //   const pageArr = new Array(5).fill().map((_, idx) => {
  //     let firstPage = Number(page) - 2;
  //     while (firstPage <= 0) {
  //       firstPage++;
  //     }

  //     return firstPage + idx;
  //   });

  const getPageArray = (currentPage, totalPages, maxPagesToShow = 5) => {
    const half = Math.floor(maxPagesToShow / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = Math.min(totalPages, maxPagesToShow);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageArray = getPageArray(Number(page), 20, 5);

  return (
    <div className="movies">
      <div className="wrapper">
        <div className="movies__content">
          <aside>
            <h2>Genre</h2>
            <div className="movies__genre">
              {genreData.map((item) => {
                return (
                  <Link to={`/movies?genre=${item.id}`} key={item.id}>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </aside>
          <div className="movies__section">
            <div className="movies__sort">
              <div className="movies__sort-header">Sort By: </div>
              <div className="movies__sort-btn-box">
                {sortBtnLayout.map((item) => {
                  return (
                    <button
                      onClick={() => handleFilter(item.query)}
                      key={item.label}
                      className={
                        sort === item.query
                          ? `movies__sort-btn--active`
                          : `movies__sort-btn`
                      }
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="movies__card">
              {movieData?.map((item) => {
                return <MovieCard item={item} key={item.id} />;
              })}
            </div>
            <div className="movies__page">
              <button
                onClick={() => navigatePage(Number(page) - 1)}
                disabled={Number(page) === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              {pageArray.map((indexPage) => (
                <button
                  onClick={() => navigatePage(indexPage)}
                  key={indexPage}
                  style={{
                    color: Number(indexPage) === Number(page) ? "red" : "#fff",
                  }}
                >
                  {indexPage}
                </button>
              ))}
              <button
                onClick={() => navigatePage(Number(page) + 1)}
                disabled={Number(page) === maxPage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
