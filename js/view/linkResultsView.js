import View from "./View.js";

class LinkResultsView extends View {
    _parentElement = document.querySelector('.results__list');
    _dropDown = document.querySelector('.dropdown');
    _errorMessage = 'No recipe found for your query! Please try agin.';

    addHandlerRender(handler) {
        this._dropDown.addEventListener('click', (e) => {
            const dropDownLink = e.target.closest('.dropdown__link');
            if (!dropDownLink) return;
            const query = dropDownLink.innerText.toLowerCase();
            if (!query) return;
            handler(query);
        });
    }

    generateMarkUp() {

        return this._data.map(data => {
            return `
                <li class="results__recipe">
                    <a href="#${data.id}" class="results__link">
                    <figure class="results__img">
                        <img src="${data.image_url}" alt="">
                    </figure>
                    <div>
                        <h3 class="heading__tertiary results__title">${data.title}</h3>
                        <span>${data.publisher}</span>
                    </div>
                    </a>
                </li> 
            `;
        }).join('');
    }
}

export default new LinkResultsView();