import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './Header.css'

export function Header({ isLoggedIn, togglePopup}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearch(!isSearch);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="he">
        <header>
          <div className="logo-container">
            <Link to="/">
              <img src="/images/Logo1.png" alt="Logo" className="logo" />
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="search-button1">
            <form id="searchForm1">
              <input
                type="text"
                id="searchInput"
                placeholder="Search..."
                className={`search-input ${isSearch ? "open1" : ""}`}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleSearch();
                }}
                type="submit"
                className="search-button"
              >
                <i className="fa-solid fa-search"></i>
              </button>
            </form>
          </div>
          <div className="hamburger-icon" onClick={toggleMenu}>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
          </div>

          <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
            <ul>
              <li onClick={() => isMenuOpen && toggleMenu()}>
                <Link to="/recipes">Recipe</Link>
              </li>
              <li onClick={() => isMenuOpen && toggleMenu()}>
                <Link to="/aboutUs">About</Link>
              </li>
              <li onClick={() => isMenuOpen && toggleMenu()}>
                <Link to="/contactUs">Contact Us</Link>
              </li>
              <li>
                <form id="searchForm">
                  <input
                    type="text"
                    id="searchInput"
                    placeholder="Search..."
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <i className="fa-solid fa-search"></i>
                  </button>
                </form>
              </li>

              {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <li>
            <a href="#" className="login-button" onClick={togglePopup}>
              Login
            </a>
          </li>
        )}

              <li onClick={() => isMenuOpen && toggleMenu()}>
                <Link to="/addRecipe">Add Recipe</Link>
              </li>
            </ul>
          </nav>
        </header>

        <section id="below-header">
          <div className="ideas">
            <p style={{ marginTop: "-18px" }}>COOK | COLLECT | CREATE</p>
          </div>
        </section>
      </div>
    </>
  );
}