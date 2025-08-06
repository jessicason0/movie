import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { generateName } from "../helper/generateName";
import "./homeGenre.css";

const imgUrl = "https://image.tmdb.org/t/p/w500";

function HomeGenre({ genre, movies }) {
  console.log(movies);
  console.log(imgUrl + movies[0].poster_path);

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
              loop
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
