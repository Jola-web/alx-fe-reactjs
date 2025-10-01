import React, { useEffect, useState } from "react";
import recipesData from "../data.json";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipes from mock data
    setRecipes(recipesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Recipe Sharing Platform
      </h1>
      <Link
  to="/add-recipe"
  className="mb-6 inline-block bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
>
  + Add New Recipe
</Link>


      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm">{recipe.summary}</p>
            <Link
                to={`/recipe/${recipe.id}`}
                className="mt-3 inline-block text-indigo-500 hover:text-indigo-700 font-medium"
               >
               View Recipe →
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
