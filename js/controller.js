import * as model from './model.js';
import * as animations from './animations.js';
import initRecipesView from './view/initRecipesView.js';
import { recipes } from './Arrays/recipeArr.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookmarkView from './view/bookmarkView.js';
import paginationView from './view/paginationView.js';
import recipeView from './view/recipeView.js';
import linkResultsView from './view/linkResultsView.js';
import cardView from './view/cardView.js';
import { cardsArr } from './arrays/cardsArr.js';
import infoResults from './view/infoResults.js';
import sliderView from './view/sliderView.js';
import popupView from './view/popupView.js';
import * as map from './view/map.js';

function controlInitRecipe() {
    // Render RECIPE
    initRecipesView.render(recipes);
}

function controlCards() {
    // Render RECIPE Cards
    cardView.render(cardsArr);
}

function controlSlider() {
    // Start Slider
    sliderView.render();
}

function scrollToRecipe() {
    // Scroll to the Recipe
    animations.scrollToRecipeSeciton();
}

async function controlPopup() {
    try {
        // Get ID
        const id = window.location.hash.slice(1);
        // If no ID
        if(!id) return;
        // Render Spinner
        popupView.renderSpinner();
        // Load Recipe
        await model.loadRecipe(id);
        // Render Recipe
        popupView.render(model.state.recipe);

    } catch(err) {
        recipeView.errorMessage();
    }
}

async function controlLinkResults(query) {
    try {
        await model.getResults(query);
        // Render Results
        linkResultsView.render(model.resultsPerPage(1));
        // Render Pagination
        paginationView.render(model.state.search);
        // Render info of results
        animations.scrollToResultsSeciton();
        // Scroll to the results section
        infoResults.render(model.state.search);
    } catch(err) {
        linkResultsView.errorMessage();
    }
}

async function controlRecipe() {
    try {
        // Get ID
        const id = window.location.hash.slice(1);
        // If no ID
        if(!id) return;
        // Render Spinner
        recipeView.renderSpinner();
        // Load Recipe
        await model.loadRecipe(id);
        // Render Recipe
        recipeView.render(model.state.recipe);
    } catch(err) {
        recipeView.errorMessage();
    }
}

async function controlResults() {
    try {
        // Render Spinner 
        resultsView.renderSpinner();
        // Get Query
        const query = searchView.getQuery();
        // Get Results
        await model.getResults(query);
        // Render Results
        resultsView.render(model.resultsPerPage(1));
        // Render Pagination
        paginationView.render(model.state.search);
        // Render info of results
        infoResults.render(model.state.search);
        // Scroll to the results section
        animations.scrollToResultsSeciton();
    } catch(err) {
        resultsView.errorMessage();
    }
}

function controlPagination(goTo) {
    // Render Results
    resultsView.render(model.resultsPerPage(goTo));
    // Render Pagination
    paginationView.render(model.state.search);
}

function controlServising(newSer) {
    model.updateServising(newSer);
    recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
    if(!model.state.recipe.bookmark) {
        model.addBookmark(model.state.recipe);
    } else {
        model.deletBookmark(model.state.recipe.id);
    }

    recipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
}

function controlBookmarks() {
    bookmarkView.render(model.state.bookmarks);
}

function init() {
    animations.type();
    setInterval(() => {
        animations.nextSlide();
    }, 3000);
    controlInitRecipe();
    controlCards();
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addBookmarkHandler(controlAddBookmark);
    bookmarkView.addHandlerRender(controlBookmarks);
    bookmarkView.addHandlerScroll(scrollToRecipe);
    searchView.addHandlerInputValue(controlResults);
    linkResultsView.addHandlerRender(controlLinkResults);
    paginationView.addHandlerRender(controlPagination);
    recipeView.addHandlerServings(controlServising);
    sliderView.addHandlerRender(controlSlider);
    popupView.addHandlerPopup(controlPopup);
    resultsView.addHandlerScroll(scrollToRecipe);
    map.mapLeaflet();
    console.log('Welcome');
}

init();