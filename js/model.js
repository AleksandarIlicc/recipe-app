import { RES_PER_PAGE, URL_API } from './config.js';

export const state = {
  recipe: [],
  search: {
    results: [],
    query: '',
    page: 1,
    numPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export async function loadRecipe(id) {
  try {
    const res = await fetch(`${URL_API}/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    const { recipe } = data.data;

    state.recipe = {
      cooking_time: recipe.cooking_time,
      id: recipe.id,
      image_url: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      source_url: recipe.source_url,
      title: recipe.title,
    };

    if(state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmark = true;
    } else {
      state.recipe.bookmark = false;
    }

  } catch (err) {
    console.err(err);
    throw err;
  }
}

export async function getResults(query) {
  try {
    state.search.query = query;

    const res = await fetch(`${URL_API}?search=${query}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`Recipe is not found (${data.status})`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        image_url: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    console.err(err);
    throw err;
  }
}

export function resultsPerPage(page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;

  return state.search.results.slice(start, end);
}

export function updateServings(newServing) {
   state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServing / state.recipe.servings;
  })

  state.recipe.servings = newServing;
}

function saveBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export function addBookmark(recipe) {
  state.bookmarks.push(recipe);
  if(state.recipe.id === recipe.id) state.recipe.bookmark = true;

  saveBookmarks();
}

export function deletBookmark(id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if(state.recipe.id === id) state.recipe.bookmark = false;

  saveBookmarks();
}

function init() {
  const storageBookmarks = localStorage.getItem('bookmarks');
  if(storageBookmarks) state.bookmarks = JSON.parse(storageBookmarks);
}
init();


