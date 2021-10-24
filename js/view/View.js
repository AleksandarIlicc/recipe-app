export default class View {
    _data;

    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.errorMessage();

        this._data = data;
        const markUp = this.generateMarkUp(this._data);
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }
    
    update(data) {
        this._data = data;
        const newMarkUp = this.generateMarkUp();
        const newDOM = document.createRange().createContextualFragment(newMarkUp);
        const newElement = [...newDOM.querySelectorAll('*')];
        const currElement = [...this._parentElement.querySelectorAll('*')];

        newElement.forEach((newEl, i) => {
            const currEl = currElement[i];

            if(!newEl.isEqualNode(currEl) && newEl.firstChild.nodeValue.trim() !== '') {
                currEl.textContent = newEl.textContent;
            }

            if(!newEl.isEqualNode(currEl)) {
                Array.from(newEl.attributes).forEach(att => {
                    currEl.setAttribute(att.name, att.value);
                })
            }
        })

    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markUp = `
            <div class="spinner">
                <span>
                <img src="https://img.icons8.com/dotty/80/000000/fidget-spinner.png" class="spinner__icon"/>
                </span>
            </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }

    errorMessage(message = this._errorMessage) {
        const markUp = `
            <div class="errorMessage">
                <p class="errorMessage__message">
                    ${message}
                    <i class="error__icon fas fa-exclamation-triangle"></i>
                </p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }
}

