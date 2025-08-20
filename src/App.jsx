import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetails from "./pages/detail/MovieDetails";
import Trending from "./pages/trending/Trending";
import Upcoming from "./pages/upcoming/Upcoming";
import MovieList from "./pages/movieList/MovieList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/upcoming" element={<Upcoming />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
