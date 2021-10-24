import View from './View.js';

class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmark__list');
    _errorMessage = 'Bookmark list is empty. Bookmarked your favorite recipe!';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    addHandlerScroll(handler) {
        this._parentElement.addEventListener('click', handler);
    }

    generateMarkUp() {
        return this._data.map(data => {
            return `
                <li class="bookmark__item">
                    <a href="#${data.id}" class="bookmark__recipe">
                    <figure class="bookmark__img">
                        <img src="${data.image_url}" alt="">
                    </figure>
                    <div class="bookmark__content">
                        <h3 class="heading__tertiary bookmark__title">${data.title}</h3>
                        <span>${data.publisher}</span>
                    </div>
                    </a>
                </li> 
            `;
        }).join('');
    }
}

export default new BookmarkView();