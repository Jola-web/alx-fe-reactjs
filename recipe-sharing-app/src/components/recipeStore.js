import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  addRecipe: (newRecipe) =>
    set((state) => { 
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
       const remaining = state.recipes.filter((recipe) => recipe.id !== id);
      return {
        recipes: remaining,
        filteredRecipes: remaining.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),
  // ---- Favorites actions ----
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // ---- Recommendations ----
  generateRecommendations: () =>
    set((state) => {
      if (state.favorites.length === 0) return { recommendations: [] };

      // Simple logic: recommend recipes that are not already favorites
      // but share the same first word in title as one of the favorites
      const favRecipes = state.recipes.filter((r) =>
        state.favorites.includes(r.id)
      );
      const keywords = favRecipes.map((r) => r.title.split(" ")[0].toLowerCase());

      const recommended = state.recipes.filter(
        (recipe) =>
          !state.favorites.includes(recipe.id) &&
          keywords.some((k) => recipe.title.toLowerCase().startsWith(k))
      );

      return { recommendations: recommended };
    }),
}));
