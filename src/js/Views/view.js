import icons  from '../../img/icons.svg';

export class View {
    _data;
    _parentElement;
    _spinner = `<div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div>`;


    constructor(parentElementClassName) {
        this._parentElement = document.querySelector(`.${parentElementClassName}`);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', this._spinner);
    }

    render(data) {
        if(!data || (Array.isArray(data) && !data.length)) return;

        this._data = data;
        const htmlMarkup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
    }

    renderMessage(msg = this._message) {
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', msg);
    }

    update(data) {
        if(!data || (Array.isArray(data) && !data.length)) return;

        const currentDOM = Array.from(this._parentElement.querySelectorAll('*'));
        const newDOM = Array.from(document.createRange().createContextualFragment(this._generateMarkup()).querySelectorAll('*'));

        currentDOM.forEach((element, index) => {
            const newElement = newDOM[index];
            if(element.isEqualNode(newElement)) return;
            element.innerHTML = newElement.innerHTML;

            
            Array.from(newElement.attributes).forEach(attr => {
                element.setAttribute(attr.name, attr.value);
            });
        });

        
    }

    renderError(msg) {
        const err = `<div class="error">
            <div>
                <svg>
                <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${msg}</p>
        </div>`;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', err);

    }
}