import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Header({ isLoggedIn, togglePopup, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearch(!isSearch);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear the logged-in user from localStorage
    setIsLoggedIn(false); // Update login state in parent component (Layout)
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // Close the menu
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
              <img src="images/Logo1.png" alt="Logo" className="logo" />
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

          {/* Navbar */}
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

              {/* Conditionally render Login/Profile button */}
              {isLoggedIn ? (
                <>
                  <li onClick={() => isMenuOpen && toggleMenu()}>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li onClick={() => isMenuOpen && toggleMenu()}>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li onClick={() => isMenuOpen && toggleMenu()}>
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