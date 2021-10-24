import View from './View.js';

class StaticRecipesView extends View {
    _parentElement = document.querySelector('.results__list');
    
    generateMarkUp() {
        return this._data.map(data => {
            return `
                <li class="results__recipe">
                    <a href="#${data.id}" class="results__link">
                    <figure class="results__img">
                        <img src="${data.image_url}" alt="">
                    </figure>
                    <div>
                        <h3 class="results__title">${data.title}</h3>
                        <span>${data.publisher}</span>
                    </div>
                    </a>
                </li>       
            `;
        }).join(''); 
    }
}

export default new StaticRecipesView();