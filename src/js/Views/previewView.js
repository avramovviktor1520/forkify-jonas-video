import { View } from "./view";

export class PreviewView extends View {
    constructor(parentClassName) {
        super(parentClassName);
    }

    _generateMarkup() {
        const currentId = window.location.hash.slice(1);
        return this._data.map(recipe => `<li class="preview ${recipe.id == currentId && 'preview__link--active'}">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.imageUrl}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>`).join('');
    }
}
