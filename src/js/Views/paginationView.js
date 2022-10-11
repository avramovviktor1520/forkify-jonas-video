import icons from '../../img/icons.svg';
import { View } from './view';

class PaginationView extends View {
    constructor() {
        super('pagination');
    }

    _generateMarkup() {
        const [currentPage, totalPages] = this._data;

        if(currentPage == totalPages) return this._prevPage(currentPage - 1); 
        if(currentPage == 1) return this._nextPage(currentPage + 1); 
        return `${this._prevPage(currentPage - 1)}${this._nextPage(currentPage + 1)}`;
    }

    _prevPage(page) {
        return `
        <button data-goto="${page}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page}</span>
        </button>
        `;
    }

    _nextPage(page) {
        return `
        <button data-goto="${page}" class="btn--inline pagination__btn--next">
            <span>Page ${page}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    addHandlerChangePage(handlerFn) {
        this._parentElement.addEventListener('click', function(e) {
            const goToPage = +e.target.closest('button')?.dataset['goto'];
            if(!goToPage) return; 

            handlerFn(goToPage);
        });
    }
}

export default new PaginationView();