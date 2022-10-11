/*
API: 
https://forkify-api.herokuapp.com/api/v2/recipes?search=%YOUR_QUERY%&key=%YOUR_KEY%
*/

import { API_ENDPOINT, API_KEY, RESULTS_PER_PAGE } from "./configuration.js";
import { getJSON, sendJSON, AJAX } from "./HTTP.js";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page:1,
        totalPages: null
    },
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) ?? []
}

const JSONtoRecipe = function(json, short = true) {

    const shortObject = {
        id: json.id,
        publisher: json.publisher,
        imageUrl: json.image_url.replace(/http/g, 'https'),
        title: json.title
    }


    return short ? shortObject : {
        ingredients: json.ingredients,
        cookingTime: json.cooking_time,
        sourceUrl: json.source_url.replace(/http/g, 'https'),
        servings: json.servings,
        ...shortObject,
        ...(json.key && {key: json.key})
    }
}

const recipeToJSON = function(object) {
    return {
        publisher: object.publisher,
        ingredients: object.ingredients,
        source_url: object.sourceUrl,
        image_url: object.imageUrl,
        title: object.title,
        servings: object.servings,
        cooking_time: object.cookingTime,
    }
}

const convertToRecipeObject = function(data) {
    const obj = {}
    const ingredientArray = [];
    for(let [property, value] of Object.entries(data)) {
        if(!value) continue;
        if(!property.includes('ingredient')) {
            obj[property] = value;
            continue;
        }
        const [quantity, unit, description] = value.split(',');
        ingredientArray.push({
            quantity,
            unit,
            description
        });
    }

    return recipeToJSON(
        {...obj, ingredients: ingredientArray}
    );
}

const getQuantityOneServing = function(quantity, serv) {
    return quantity / serv;
}

export const addNewRecipe = async function(data) {
   const newRecipeObject = convertToRecipeObject(data);
   const jsonResponse = await AJAX(`${API_ENDPOINT}?key=${API_KEY}`, newRecipeObject);
}

export const updateServings = function(increase = true) {
    if(!increase && state.recipe.servings == 1) return;

    state.recipe.ingredients.forEach(ing => {
        if(!ing.quantity) return;
        const oneServing = getQuantityOneServing(ing.quantity, state.recipe.servings);
        ing.quantity = increase ? ing.quantity + oneServing : ing.quantity - oneServing;
    })
    
    state.recipe.servings = increase ? state.recipe.servings + 1 : state.recipe.servings - 1;
}

export const getResultsForPage = function(results, currentPage) {
    return results.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);
}

export const changePageNumber = function(newPageNumber) {
    if(newPageNumber < 1 || newPageNumber > state.search.totalPages) return false;
    return !!(state.search.page = newPageNumber);
}

export const searchRecipeByID = async function(id) {
    try {
        
        let {recipe} = (await AJAX(`${API_ENDPOINT}/${id}`)).data;
        recipe = JSONtoRecipe(recipe, false);
        
        
        state.recipe = recipe;
        state.recipe.bookmarked = state.bookmarks.some(b => b.id == recipe.id);
    } catch(err) {
        err.message = 'Could not load the recipe';
        throw err;
    }
}

export const searchRecipes = async function(query) {
    //Attempts to get result
    try {
        const {recipes} = (await AJAX(`${API_ENDPOINT}?search=${query}&key=${API_KEY}`)).data;
        
        if(!recipes.length) throw new Error(`No results found for ${query}`);

        state.search.results = recipes.map(rec => {
            return JSONtoRecipe(rec, true)
        });
        state.search.totalPages = Math.ceil(recipes.length / RESULTS_PER_PAGE);
    } 
    //Handles error
    catch(err) {
        throw err;
    }
}

const addBookmark = function() {
    state.bookmarks.push(state.recipe);
}

const removeBookmark = function() {
    state.bookmarks = state.bookmarks.filter(b => b.id != state.recipe.id);
}

export const manageRecipeBookmark = function() {
    state.recipe.bookmarked = !state.recipe.bookmarked;
    state.recipe.bookmarked ? addBookmark() : removeBookmark();
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}
