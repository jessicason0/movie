import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { generateName } from "../../helper/generateName";
import "./homeGenre.css";
import { useNavigate } from "react-router";

const imgUrl = "https://image.tmdb.org/t/p/w500";

function HomeGenre({ genre, movies }) {
  const navigate = useNavigate();

  function movieDetailPage(id) {
    navigate(`/details/${id}`);
  }

  return (
    <div className="home-genre">
      <div className="wrapper">
        <div className="home-genre__content">
          <div className="home-genre__genre">
            <h3>{generateName(genre)}</h3>
            <div>horizontal scroll</div>
          </div>
          <div className="home-genre__movies">
            <button
              className={`home-genre__btn arrow--prev arrow--prev-${genre}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </button>
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={10}
              slidesPerView={5}
              slidesPerGroup={5}
              speed={700}
              navigation={{
                prevEl: `.arrow--prev-${genre}`,
                nextEl: `.arrow--next-${genre}`,
              }}
              onInit={(swiper) => {
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              {movies.map((item) => {
                return (
                  <SwiperSlide>
                    <div className="img-container" key={item.id}>
                      {
                        <div className={`home-genre__details`}>
                          <div className="home-genre__details-box">
                            <p>{item.title}</p>
                            <div className="home-genre__rating">
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
                                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                              </svg>
                              <div>{item.vote_average.toFixed(1)}</div>
                            </div>
                          </div>
                          <button
                            className="home-genre__details-btn"
                            onClick={() => movieDetailPage(item.id)}
                          >
                            Movie Details
                          </button>
                        </div>
                      }
                      <img src={imgUrl + item.poster_path} alt={item.title} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <button
              className={`home-genre__btn arrow--next arrow--next-${genre}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeGenre;
