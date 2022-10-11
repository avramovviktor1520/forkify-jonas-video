import 'core-js/stable';
import 'regenerator-runtime';

import * as modelAPI from './model.js';

window.m = modelAPI;

import searchView from './Views/searchView';
import resultsView from './Views/resultsView.js';
import paginationView from './Views/paginationView.js';
import recipeView from './Views/recipeView.js';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';


const displayResultsAndPagination = function() {
  if(!modelAPI.state.search.results.length) return;

  resultsView.render(
    modelAPI.getResultsForPage(modelAPI.state.search.results, modelAPI.state.search.page)
  );
  paginationView.render([modelAPI.state.search.page, modelAPI.state.search.totalPages]);
}

const controlChangePage = function(newPage) {
  if(!modelAPI.changePageNumber(newPage)) return;
  displayResultsAndPagination();
}

const controlSearchRecipes = async function(query) {
  try {
    resultsView.renderSpinner();
    //fetch results
    await modelAPI.searchRecipes(query);
    //display results 
    displayResultsAndPagination();

  } catch(err) {
    resultsView.renderError(err.message);
  }
}

const controlSelectRecipe = async function() {
  console.log(23);

}
// const controlSelectRecipe = async function(id) {
//   try {
//     recipeView.renderSpinner();
//     await modelAPI.searchRecipeByID(id);
//     recipeView.render(modelAPI.state.recipe);
    
//     if(modelAPI.state.search.results.length) {
//       resultsView.update(
//         modelAPI.getResultsForPage(modelAPI.state.search.results, modelAPI.state.search.page)
//       );
//     }

//     modelAPI.state.bookmarks.length && bookmarksView.render(modelAPI.state.bookmarks);

//   } catch(err) {
//     console.log(err);
//     recipeView.renderError(err.message);
//   }
// }

const controlUpdateServings = function(increase) {
  modelAPI.updateServings(increase);
  recipeView.update(modelAPI.state.recipe);
}

const controlAddBookmark = function() {
  modelAPI.manageRecipeBookmark();
  recipeView.update(modelAPI.state.recipe);
  modelAPI.state.bookmarks.length ? bookmarksView.render(modelAPI.state.bookmarks) : bookmarksView.renderMessage();
}

const controlAddRecipe = async function(data) {
  try {
    throw new Error('Unable to add recipe (Build your own application)');
    modelAPI.addNewRecipe(data);
  } catch(err) {
    addRecipeView.renderError(err);
  }
}
 
function init() {
  searchView.addHandlerSearchRecipes(controlSearchRecipes);
  paginationView.addHandlerChangePage(controlChangePage);
  recipeView.addHandlerLoadRecipe(controlSelectRecipe);
  recipeView.addHandlerBookmarkRecipe(controlAddBookmark);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  addRecipeView.addHandlerAddRecipe(controlAddRecipe);
}
init();

