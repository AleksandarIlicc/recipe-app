import View from "./View.js";

class infoOfResults extends View {
    _parentElement = document.querySelector('.results__all');
    
    generateMarkUp() {
        return `<div class="results__all--info">Results for ${this._data.query}: ${this._data.results.length}</div>`;
    }
}

export default new infoOfResults();