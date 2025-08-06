import React from "react";
import "./navbar.css";
import { Link } from "react-router";

function Navbar() {
  return (
    <header>
      <nav>
        <Link to={"/"}>
          <img
            src="https://www.clipartmax.com/png/middle/1-10021_clipart-movies-hd-movies-logo-transparent.png"
            alt="logo"
          />
        </Link>
        <div className="nav__content">
          <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"movies"}>Movies</Link>
            <Link to={"popular"}>Popular</Link>
            <Link to={"genre"}>Genre</Link>
          </ul>
          <input type="text" placeholder="search movies" />
          <div>
            <button>Login</button>
            <button>Sign Up</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
