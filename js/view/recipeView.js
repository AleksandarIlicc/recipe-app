import View from "./View.js";

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe__container');
    _errorMessage = 'We could not find the recipe. Please try another one!';

    addHandlerRender(handler) {
        ['DOMContentLoad', 'hashchange'].forEach(event => {
            window.addEventListener(event, () => {
                handler();
            });
        })
    }

    addBookmarkHandler(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const bookmarkBtn = e.target.closest('.bookmark__btn');
            if(!bookmarkBtn) return;
            handler();
        })
    }

    addHandlerServings(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn__update-servings');
            if(!btn) return;
            const data = btn.dataset.serving;
            if(+data > 0) handler(+data);
        })
    }

    generateMarkUp() {
        return `
        <div class="recipe__header">
            <h2 class="heading__primary recipe__title">${this._data.title}</h2>
            <h2 class="heading__secondary">How to cook it?</h2>
            <p class="recipe__publisher">This recipe was carefully prepared by: <span>${this._data.publisher}</span></p>
            <p class="recipe__source">Check out this <a href="${this._data.source_url}" target="_blank">website</a> for more informations.</p>
        </div>
        
        <div class="recipe__box">
            <div>
            <figure class="recipe__img">
                <img src="${this._data.image_url}" alt="${this._data.title}">
                <p class="bookmark bookmark__btn">
                    <i class="bookmark__icon ${this._data.bookmark ? 'fas fa-bookmark' : 'far fa-bookmark'}"></i>
                </p>
            </figure>
            <div class="recipe__details">
                <p class="recipe__info">
                    <i class="far fa-clock"></i> 
                    <span class="recipe__info--minute">${this._data.cooking_time} </span>
                    <span>minutes</span>
                </p>
                <p class="recipe__info recipe__info--right">
                    <i class="fas fa-users"></i> 
                    <span>Servings</span>
                    <span class="recipe__info--people">${this._data.servings}</span>

                    <button class="btn__servings btn__update-servings" data-serving="${this._data.servings - 1}">
                        <i class="recipe__icon--minus fas fa-minus-circle"></i>
                    </buttons>
                    <button class="btn__servings btn__update-servings" data-serving="${this._data.servings + 1}">
                        <i class="recipe__icon--plus fas fa-plus-circle"></i>
                    </buttons>
                </p>
            </div>
            </div>

            <div class="recipe__ingredients">
            <ul class="recipe__ingredients-list">
                <figure class="recipe__ingredients-list--icon">
                    <img src="https://img.icons8.com/external-justicon-lineal-justicon/64/000000/external-cooking-cooking-justicon-lineal-justicon-1.png"/>
                </figure>
                ${this._data.ingredients.map(ing => {
                    return `
                    <li class="recipe__ingredient">
                        <i class="recipe__ingredient--icon fas fa-check"></i>
                        <span class="recipe__quantity">${ing.quantity ? ing.quantity : ''}</span>
                        <span class="recipe__unite">${ing.unit}</span>
                        <span class="recipe__description">${ing.description}</span>
                    </li>
                    `
                }).join('')}
            </ul>
            </div>
        </div>
        `;
    }
}

export default new RecipeView();