import { Link } from "react-router-dom";
import { Button } from "./components/elements/button";
import { RecipeBox } from "./components/elements/RecipeBox";

export function Header() {
  return (
    <>
      <section id="header">

      <Link to={"/"}><img src="images/Logo1.png" class="logo"/></Link>

      <div style={{marginTop: "14px"}}>
        <ul id="navbar">
          <li><a href="Recipes.html">Recipes</a></li>
          <li><a href="Blog.html">Contact Us</a></li>
          <li><a href="AboutUs.html">About</a></li>

          <li id="searchContainer">
            <form id="searchForm" autocomplete="off">
              <input type="text" id="searchInput" placeholder="Search..." />
              <button type="submit" id="searchButton">
                <i class="fa-solid fa-search"></i>
              </button>
              <div id="searchResults" class="hidden"></div>
            </form>
          </li>

          

          <div class="popup" id="popup-2">
            <div class="content" style={{height: "600px", top: "400px"}}>
              <div class="close-btn" onclick="togglePopup1()">x</div>

              <p class="log1">Create Your <span style={{fontWeight: "bold", color: "#178F7A"}}>Recipe Realm</span> Account</p>
              <div class="input-field"><input id="registerName" placeholder="Name" class="validate"/></div>
              <div class="input-field"><input id="registerPhoneNumber" placeholder="Phone Number" class="validate"/></div>
              <div class="input-field"><input id="registerEmail" placeholder="Email" class="validate" type="email" required/></div>
              <div class="input-field"><input id="registerPassword" placeholder="Password" class="validate"/></div>
              <button class="second-button" onclick="register()">Register</button>
              <p>Already have an account? <a onclick="togglePopup()"><span
                    style={{color: "blue", cursor: "pointer", textDecoration: "underline"}}>Login</span></a></p>
            </div>
          </div>

          <li><a onclick="togglePopup()" id="loginBtn" style={{marginLeft:"-30px", cursor: "pointer"}}>Login</a></li>
          <button id="logoutButton" style={{display: "none"}} onclick="logout()" class="logout">Logout</button>

          <li><a href="AddARecipe.html" style={{marginLeft:"-30px;"}}>Your Recipes</a></li>
        </ul>
      </div>
      </section>

    <section id="below-header">
      <div class="ideas">
        <p style={{marginTop:"-18px"}}>COOK | COLLECT | CREATE</p>
      </div>
    </section>

    <section id="gap">
    <div style={{height:"20px", backgroundColor: "rgb(232, 232, 232)"}}>
    </div>
  </section>

    <section id="today-topic">
      <h1>Today's Inspiration</h1>
        <div className="cat3">
          <RecipeBox image="images/mmm.webp" title="Matar Malai Methi"/>
        </div>

    </section>
  </>
    )
}