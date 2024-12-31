import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecipeBox } from "../elements/RecipeBox";
import "./index.css";

export function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselRecipes, setCarouselRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8080/recipes");
        const data = await response.json();

        // Shuffle recipes and select 3 for the carousel
        const shuffled = data.sort(() => 0.5 - Math.random());
        setCarouselRecipes(shuffled.slice(0, 3));

        // Trending recipes (you can customize how trending is defined)
        setTrendingRecipes(data.slice(0, 5)); // Take the first 5 as trending
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Automatic carousel change
  useEffect(() => {
    const interval = setTimeout(() => {
      setCarouselIndex((prevIndex) =>
        carouselRecipes.length ? (prevIndex + 1) % carouselRecipes.length : 0
      );
    }, 3000); // Change image every 3 seconds
    return () => clearTimeout(interval);
  }, [carouselIndex, carouselRecipes]);

  return (
    <div className="home-page">
      {/* Carousel Section */}
      <section className="carousel">
        {isLoading ? (
          <div>Loading carousel...</div>
        ) : (
          <div className="carousel-container">
            {carouselRecipes.length > 0 && (
              <div className="carousel-item">
                <Link to={`/recipes/${carouselRecipes[carouselIndex]._id}`}>
                  <img
                    src={carouselRecipes[carouselIndex].recipeImage}
                    alt={carouselRecipes[carouselIndex].recipeName}
                  />
                  <h2>{carouselRecipes[carouselIndex].recipeName}</h2>
                </Link>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Trending Recipes Section */}
      <section className="trending-recipes">
        <h1>Trending Recipes</h1>
        {isLoading ? (
          <div>Loading trending recipes...</div>
        ) : (
          <div className="recipes-container">
            {trendingRecipes.map((recipe) => (
              <Link to={`/recipes/${recipe._id}`} className="recipe-card" key={recipe.id}>
                <RecipeBox title={recipe.recipeName} image={recipe.coverImage}></RecipeBox>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Tips Section */}
      <section id="articles">
  <h1>Tips</h1>
  <div class="cat1">
    <div class="hold1">
      <div class="notes">
        <p>Tips on Cutting and Peeling</p>
        <ul>
          <li>Wash vegetables before peeling or cutting to preserve the water-soluble vitamins.</li>
          <li>Peel vegetables as thinly as possible to preserve the minerals and vitamins.</li>
          <li>Remove the stems of green chilies while storing them to help them stay fresh for long.</li>
          <li>After peeling onions, cut in half and soak in water for about 10 minutes to avoid crying.</li>
          <li>Soak potatoes and eggplant after cutting to avoid discoloration.</li>
          <li>If you boil vegetables in water, do not throw the water. Keep it to make gravies.</li>
          <li>To avoid browning of apples after cutting, apply a little lemon juice on the cut surface. The apples will stay fresh longer.</li>
          <li>Keep coriander leaves in a muslin cloth bag in the refrigerator to remain fresh longer.</li>
        </ul>
      </div>
    </div>

    <div class="hold1">
      <div class="notes">
        <p>Tips on Frying</p>
        <ul>
          <li>Heat the oil thoroughly before adding seasonings or vegetables.</li>
          <li>Fry the seasonings until they change color to get the full flavor of the seasonings.</li>
          <li>If masala sticks to the pan, it indicates insufficient fat quantity.</li>
          <li>Add some hot oil and 1/2 tsp of baking soda in the batter while making pakodas.</li>
          <li>Poori can be rolled and placed between well-rinsed wet muslin cloth at least an hour ahead and can be fried before serving.</li>
          <li>To make pooris crispier, add a little rice flour to the wheat flour while kneading.</li>
          <li>Pakodas will turn out crisper if a little corn flour is added to the besan while preparing the batter.</li>
          <li>If making patties or tikkis of potatoes, always boil the potatoes well in advance and cool them before use.</li>
        </ul>
      </div>
    </div>

    <div class="hold1">
      <div class="notes">
        <p>Tips on Cooking</p>
        <ul>
          <li>To make 1 cup of dal, add at least 2-3 cups of water, depending on the type of dal.</li>
          <li>Soak whole pulses overnight and other dals for one hour before cooking.</li>
          <li>Always add hot water to the gravy to enhance the taste.</li>
          <li>Add 1 Tbsp of hot oil to the dough for making Kachories or Kulchas.</li>
          <li>Always use heavy-bottomed vessels to make desserts, in order to avoid burning.</li>
          <li>Whenever curd is to be added to the masala, it should be beaten well and added gradually.</li>
          <li>Chop some extra vegetables for next day stir fry.</li>
          <li>While boiling milk, always add a little water at the base of the vessel to avoid the milk from sticking at the bottom.</li>
          <li>Add a few drops of lemon and a tsp of oil to rice before boiling to separate each grain.</li>
          <li>Never discard the water in which vegetables are cooked, use it in gravies or soups.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}