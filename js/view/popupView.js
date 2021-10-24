import View from "./View.js";

class PopupView extends View {
    _parentElement = document.querySelector('.popup__box');

    addHandlerPopup(handler) {
        window.addEventListener('hashchange', () => {
            handler();
        });
    }

    generateMarkUp() {
        return `
            <div class="popup__left">
                <div class="heading__primary mb-medium">${this._data.title}</div>
                <figure class="popup__img">
                    <img src="${this._data.image_url}" alt="">
                </figure>
            
                <div class="popup__details mt-large">
                    <p class="popup__info popup__info--minute">
                        <i class="far fa-clock"></i> 
                        <span class="popup__info--minute">${this._data.cooking_time}</span>
                        <span>minutes</span>
                    </p>
                    <p class="popup__info popup__info--servings">
                        <i class="fas fa-users"></i> 
                        <span>Servings</span>
                        <span class="popup__info--people">${this._data.servings}</span>
                    </p>
                </div>
            </div>

            <div class="popup__right">
                <ul class="popup__ingredients-list">
                <figure class="popup__ingredients-list--icon">
                    <img src="https://img.icons8.com/external-justicon-lineal-justicon/64/000000/external-cooking-cooking-justicon-lineal-justicon-1.png"/>
                </figure>
                ${this._data.ingredients.map(ing => {
                    return `
                        <li class="popup__ingredient">
                            <i class="popup__ingredient--icon fas fa-check"></i>
                            <span class="popup__quantity">${ing.quantity ? ing.quantity : ''}</span>
                            <span class="popup__unite">${ing.unit}</span>
                            <span class="popup__description">${ing.description}</span>
                        </li>
                    `;
                }).join('')}
                </ul>
            </div>
        `;
    }
}

export default new PopupView();