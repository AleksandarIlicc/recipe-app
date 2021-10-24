import View from './View.js';

class ResultsView extends View {
    _parentElement = document.querySelector('.results__list');
    _errorMessage = 'No recipe found for your query! Please try agin.';

    addHandlerScroll(handler) {
        this._parentElement.addEventListener('click', (e) => {
            handler();
        })
    }

    generateMarkUp() {
        return this._data.map(data => {
            return `
                <li class="results__recipe">
                    <a href="#${data.id}" class="results__link">
                    <figure class="results__img">
                        <img src="${data.image_url}" alt="">
                    </figure>
                    <div class="results__content">
                        <h3 class="heading__tertiary results__title">${data.title}</h3>
                        <span>${data.publisher}</span>
                    </div>
                    </a>
                </li> 
            `;
        }).join(''); 
    }
}

export default new ResultsView();