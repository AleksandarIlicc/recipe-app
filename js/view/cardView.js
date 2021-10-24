import View from "./View.js";

class CardView extends View {
    _parentElement = document.querySelector('.grid__container');

    generateMarkUp() {
        return this._data.map(data => {
            return `
                <div class="recipeItem__card" data-id="${data.id}">
                    <a href="#${data.id}">
                    <figure class="recipeItem__img">
                        <img src="${data.image_url}" alt="">
                        <div class="recipeItem__iconBox">
                            <i class="recipeItem__icon ${data.bookmark ? 'fas fa-heart' : 'far fa-heart'}"></i>
                        </div>
                        <div class="recipeItem__imgOverlay"></div>
                        <button class="btn__popup">View more</button>
                    </figure>
                    <div class="recipeItem__content">
                        <h2 class="heading__secondary mb-small">${data.title}</h2>
                        <p>Cooked by: ${data.publisher}</p>
                        <p>Check out this website for more informations </p>
                    </div>
                    </a>
                </div>
            `;
        }).join('');
    }
}

export default new CardView();