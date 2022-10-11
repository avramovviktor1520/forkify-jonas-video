import { View } from "./view";

class AddRecipeView extends View {
    _overlay = document.querySelector('.overlay');
    _modalWindow = document.querySelector('.add-recipe-window');
    _openBtn = document.querySelector('.nav__btn--add-recipe');
    _closeBtn = document.querySelector('.btn--close-modal');

    constructor() {
        super('upload');
        this._addRecipeWindow();
    }


    _toggleHiden() {
        this._overlay.classList.toggle('hidden');
        this._modalWindow.classList.toggle('hidden');
    }

    _addRecipeWindow() {
        [this._openBtn, this._closeBtn].forEach(btn => btn.addEventListener('click', this._toggleHiden.bind(this)));
    }

    addHandlerAddRecipe(handlerFn) {
        this._parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Array.from(new FormData(this._parentElement));
            handlerFn(Object.fromEntries(data));
        });
    }
}

export default new AddRecipeView();