document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn");
  const ingredientsInput = document.getElementById("ingredients-input");
  const recipeContainer = document.getElementById("recipe-container");

  //   require("dotenv").config();
  //   console.log(process.env);

  searchBtn.addEventListener("click", function () {
    const ingredients = ingredientsInput.value;
    if (ingredients == "") {
      document.querySelector("#message").innerHTML = "No ingredient added";
    }
    fetchRecipes(ingredients);
  });

  async function fetchRecipes(ingredients) {
    try {
      document.querySelector("#message").innerHTML = "Loading....";
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=accd1a1265964493b29156a5681c4bb3`
      );
      const recipes = await response.json();
      displayRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  function displayRecipes(recipes) {
    document.querySelector("#message").innerHTML = "";
    if (recipes.length == 0) {
      document.querySelector("#message").innerHTML = "Nothing found";
    }
    recipeContainer.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe");
      recipeCard.innerHTML = `
            <h2>${recipe.title}</h2>
            <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
            <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
          `;
      recipeContainer.appendChild(recipeCard);
    });
  }
});
