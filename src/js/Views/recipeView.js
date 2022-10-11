import { View } from "./view";
import icons from '../../img/icons.svg';
// import {Fraction} from 'fractional';
import {Fraction} from 'fraction.js'


class RecipeView extends View {
    constructor() {
        super('recipe');
    }

    _generateIngredientsMarkup(ingredientArray) {
        return ingredientArray.map(ingObject => {
            return `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingObject.quantity ? new Fraction(+ingObject.quantity).toFraction(true) : ''}</div>
                <div class="recipe__description">
                <span class="recipe__unit">${ingObject.units || ''}</span>
                ${ingObject.description || ''}
                </div>
            </li>`
        }).join('');
    }
    _generateMarkup() {
        return `
        <figure class="recipe__fig">
            <img src="${this._data.imageUrl}" alt="${this._data.title}" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${this._data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">45</span>
            <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
                <button data-servingsincrease='0' class="btn--servings btn--tiny btn--increase-servings">
                <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                </svg>
                </button>
                <button data-servingsincrease='1'  class="btn--servings btn--tiny btn--increase-servings">
                <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                </svg>
                </button>
            </div>
            </div>

            <div class="recipe__user-generated hidden">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
            <button class="btn--round btn-bookmark">
                <svg class="">
                    <use href="${icons}#icon-bookmark${(this._data.bookmarked && '-fill') || ''}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
                ${this._generateIngredientsMarkup(this._data.ingredients)}
            </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
            </p>
            <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
            >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>`;
    }

    addHandlerLoadRecipe(handlerFunction) {
        ['hashchange', 'load'].forEach(event => {
            window.addEventListener(event, () => {
                const id = window.location.hash.slice(1);
                if(!id) return;
                handlerFunction(id);
            });
        });
    }

    addHandlerBookmarkRecipe(handlerFn) {
        this._parentElement.addEventListener('click', e => {
            if(!e.target.closest('.btn-bookmark')) return;
            handlerFn();
        });
    }

    addHandlerUpdateServings(handlerFn) {
        this._parentElement.addEventListener('click', e => {
            const servingsUpdate = e.target.closest('.btn--servings');
            if(!servingsUpdate) return;

            handlerFn(Boolean(+servingsUpdate.dataset.servingsincrease));
        })
    }
}

export default new RecipeView();