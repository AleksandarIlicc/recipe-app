import View from "./View.js";

class SliderView extends View {
    _parentElement = document.querySelector('.recipe__container');
    _navLogo = document.querySelector('.nav__logo');

    addHandlerRender(handler) {
        this._navLogo.addEventListener('click', (e) => {
            handler();
        })
    }

    generateMarkUp() {
        return `
            <div class="recipe__slider">
                <h1 class="heading__primary recipe__slider-title">
                    What's to cook?
                </h1>
                <div class="recipe__overlay"></div>
                <div class="recipe__slide">
                    <img src="./images/pexels-elevate-1267320.jpg" alt="">
                </div>
                <div class="recipe__slide">
                    <img src="http://forkify-api.herokuapp.com/images/BBQChickenPizza3e2b.jpg" alt="">
                </div>
                <div class="recipe__slide">
                    <img src="http://forkify-api.herokuapp.com/images/capresefc49.jpg" alt="">
                </div>
                <div class="recipe__slide">
                    <img src="http://forkify-api.herokuapp.com/images/TropicalCucumberAvocadoSalad3e39.jpg" alt="">
                </div>
                <button class="btn__slider btn__slider--left">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="btn__slider btn__slider--right">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    }
}

export default new SliderView();