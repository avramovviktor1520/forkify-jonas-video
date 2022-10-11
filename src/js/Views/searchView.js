
class SearchView {
    _parentElement = document.querySelector('.search');
    _button = this._parentElement.querySelector('button');
    _inputElement = this._parentElement.querySelector('input[type="text"]');

    
    addHandlerSearchRecipes(handlerFunction) {
        this._button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const searchQuery = this._inputElement.value.trim().replace(/ */g, '');
            if(!searchQuery) return;
            handlerFunction(searchQuery);
        });
    }

}

export default new SearchView();