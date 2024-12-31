// // import { Link } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import './Header.css'

// // export function Header({ isLoggedIn, togglePopup }) {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isSearch, setIsSearch] = useState(false);

// //   // Toggle menu visibility
// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   const toggleSearch = () => {
// //     setIsSearch(!isSearch);
// //   };

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth > 768) {
// //         setIsMenuOpen(false); // Close the menu
// //       }
// //     };

// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   return (
// //     <>
// //       <div className="he">
// //         <header>
// //           <div className="logo-container">
// //             <Link to="/">
// //               <img src="/images/Logo1.png" alt="Logo" className="logo" />
// //             </Link>
// //           </div>

// //           {/* Hamburger Icon */}
// //           <div className="search-button1">
// //             <form id="searchForm1">
// //               <input
// //                 type="text"
// //                 id="searchInput"
// //                 placeholder="Search..."
// //                 className={`search-input ${isSearch ? "open1" : ""}`}
// //               />
// //               <button
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   toggleSearch();
// //                 }}
// //                 type="submit"
// //                 className="search-button"
// //               >
// //                 <i className="fa-solid fa-search"></i>
// //               </button>
// //             </form>
// //           </div>
// //           <div className="hamburger-icon" onClick={toggleMenu}>
// //             <div className={isMenuOpen ? "bar open" : "bar"}></div>
// //             <div className={isMenuOpen ? "bar open" : "bar"}></div>
// //             <div className={isMenuOpen ? "bar open" : "bar"}></div>
// //           </div>

// //           {/* Navbar */}
// //           <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
// //             <ul>
// //               <li onClick={() => isMenuOpen && toggleMenu()}>
// //                 <Link to="/recipes">Recipe</Link>
// //               </li>
// //               <li onClick={() => isMenuOpen && toggleMenu()}>
// //                 <Link to="/aboutUs">About</Link>
// //               </li>
// //               <li onClick={() => isMenuOpen && toggleMenu()}>
// //                 <Link to="/contactUs">Contact Us</Link>
// //               </li>
// //               <li>
// //                 <form id="searchForm">
// //                   <input
// //                     type="text"
// //                     id="searchInput"
// //                     placeholder="Search..."
// //                     className="search-input"
// //                   />
// //                   <button type="submit" className="search-button">
// //                     <i className="fa-solid fa-search"></i>
// //                   </button>
// //                 </form>
// //               </li>

// //               {isLoggedIn ? (
// //                 <>
// //                   <li>
// //                     <Link to="/profile">Profile</Link>
// //                   </li>
// //                 </>
// //               ) : (
// //                 <li>
// //                   <a className="login-button" onClick={togglePopup}>
// //                     Login
// //                   </a>
// //                 </li>
// //               )}

// //               <li onClick={() => isMenuOpen && toggleMenu()}>
// //                 <Link to="/addRecipe">Add Recipe</Link>
// //               </li>
// //             </ul>
// //           </nav>
// //         </header>

// //         <section id="below-header">
// //           <div className="ideas">
// //             <p style={{ marginTop: "-18px" }}>COOK | COLLECT | CREATE</p>
// //           </div>
// //         </section>
// //       </div>
// //     </>
// //   );
// // }

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import './Header.css';

// export function Header({ isLoggedIn, togglePopup }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearch, setIsSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [recipes, setRecipes] = useState([]);
//   const [filteredRecipes, setFilteredRecipes] = useState([]);

//   // Fetch recipes from backend
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/recipes`);  // Adjust API endpoint as needed
//         const data = await response.json();
//         setRecipes(data); 
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   useEffect(() => {
//     console.log(recipes);
//     if (searchTerm === '') {
//       setFilteredRecipes([]);
//     } else {
//       const results = recipes.filter(recipe =>
//         recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredRecipes(results);
//     }
//   }, [searchTerm, recipes]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleSearch = () => {
//     setIsSearch(!isSearch);
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setIsMenuOpen(false); 
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       <div className="he">
//         <header>
//           <div className="logo-container">
//             <Link to="/">
//               <img src="/images/Logo1.png" alt="Logo" className="logo" />
//             </Link>
//           </div>

//           <div className="search-button1">
//             <form id="searchForm1">
//               <input
//                 type="text"
//                 id="searchInput"
//                 value={searchTerm}
//                 onChange={handleSearchInputChange}
//                 placeholder="Search..."
//                 className={`search-input ${isSearch ? "open1" : ""}`}
//               />
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleSearch();
//                 }}
//                 type="submit"
//                 className="search-button"
//               >
//                 <i className="fa-solid fa-search"></i>
//               </button>
//             </form>
//           </div>

//           <div className="hamburger-icon" onClick={toggleMenu}>
//             <div className={isMenuOpen ? "bar open" : "bar"}></div>
//             <div className={isMenuOpen ? "bar open" : "bar"}></div>
//             <div className={isMenuOpen ? "bar open" : "bar"}></div>
//           </div>

//           <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
//             <ul>
//               <li onClick={() => isMenuOpen && toggleMenu()}>
//                 <Link to="/recipes">Recipe</Link>
//               </li>
//               <li onClick={() => isMenuOpen && toggleMenu()}>
//                 <Link to="/aboutUs">About</Link>
//               </li>
//               <li onClick={() => isMenuOpen && toggleMenu()}>
//                 <Link to="/contactUs">Contact Us</Link>
//               </li>
//               <li>
//                 <form id="searchForm">
//                   <input
//                     type="text"
//                     id="searchInput"
//                     value={searchTerm}
//                     onChange={handleSearchInputChange}
//                     placeholder="Search..."
//                     className="search-input"
//                   />
//                   <button type="submit" className="search-button">
//                     <i className="fa-solid fa-search"></i>
//                   </button>
//                 </form>
//                 {/* Search results dropdown */}
//                 {filteredRecipes.length > 0 && (
//                   <div className={`searchResults ${searchTerm ? 'visible' : ''}`}>
//                     {filteredRecipes.map((recipe, index) => (
//                       <div key={index} className="searchItem">
//                         <Link to={`http://localhost:5173/recipes/${recipe._id}`} onClick={() => setSearchTerm('')}>
//                           <img src={recipe.coverImage} alt={recipe.recipeName} width={50} />
//                           <span>{recipe.recipeName}</span>
//                         </Link>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </li>

//               {isLoggedIn ? (
//                 <>
//                   <li>
//                     <Link to="/profile">Profile</Link>
//                   </li>
//                 </>
//               ) : (
//                 <li>
//                   <a className="login-button" onClick={togglePopup}>
//                     Login
//                   </a>
//                 </li>
//               )}

//               <li onClick={() => isMenuOpen && toggleMenu()}>
//                 <Link to="/addRecipe">Add Recipe</Link>
//               </li>
//             </ul>
//           </nav>
//         </header>

//         <section id="below-header">
//           <div className="ideas">
//             <p style={{ marginTop: "-18px" }}>COOK | COLLECT | CREATE</p>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './Header.css';

export function Header({ isLoggedIn, togglePopup }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/recipes`);  // Adjust API endpoint as needed
        const data = await response.json();
        setRecipes(data); 
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredRecipes([]);
    } else {
      const results = recipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(results);
    }
  }, [searchTerm, recipes]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearch(!isSearch);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);  // Close menu on large screens
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

          {/* Search Button */}
          <div className="search-button1">
            <form id="searchForm1">
              <input
                type="text"
                id="searchInput"
                value={searchTerm}
                onChange={handleSearchInputChange}
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

          {/* Hamburger Icon */}
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

              {/* Search Form */}
              <li>
                <form id="searchForm">
                  <input
                    type="text"
                    id="searchInput"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    placeholder="Search..."
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <i className="fa-solid fa-search"></i>
                  </button>
                </form>
                
                {/* Search Results Dropdown */}
                {filteredRecipes.length > 0 && (
                  <div className={`searchResults ${searchTerm ? 'visible' : ''}`}>
                    {filteredRecipes.map((recipe, index) => (
                      <div key={index} className="searchItem">
                        <Link
                          to={`/recipes/${recipe._id}`}
                          onClick={() => setSearchTerm('')} // Reset search term after selection
                        >
                          <img src={recipe.coverImage} alt={recipe.recipeName} width={50} />
                          <span>{recipe.recipeName}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </li>

              {/* Conditional Links Based on Login */}
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li onClick={() => isMenuOpen && toggleMenu()}>
                    <Link to="/addRecipe">Add Recipe</Link>
                  </li>
                </>
              ) : (
                <li>
                  <a className="login-button" onClick={togglePopup}>
                    Login
                  </a>
                </li>
              )}
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