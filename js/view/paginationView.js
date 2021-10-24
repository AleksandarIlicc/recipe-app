import View from "./View.js";
import { RES_PER_PAGE } from '../config.js';


class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerRender(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.pagination__btn');
            if(!btn) return;
            const goTo = btn.dataset.goTo;
            handler(+goTo);
        })
    }

    generateMarkUp(data) {
        const currPage = data.page;
        const numPage = Math.ceil(data.results.length / RES_PER_PAGE);

        if(currPage === 1 && numPage > 1) {
            return `
                <button data-go-to="${currPage + 1}" class="pagination__btn pagination__btn--right">
                    <span>${currPage + 1}</span><i class="pagination__icon--right fas fa-long-arrow-alt-right"></i>
                </button>
            `;
        }

        if(currPage > 1 && numPage > currPage) {
            return `
            <button data-go-to="${currPage - 1}" class="pagination__btn pagination__btn--left">
                <i class="pagination__icon--left fas fa-long-arrow-alt-left"></i><span>${currPage - 1}</span>
            </button>
            <button data-go-to="${currPage + 1}" class="pagination__btn pagination__btn--right">
                <span>${currPage + 1}</span><i class="pagination__icon--right fas fa-long-arrow-alt-right"></i>
            </button>
            `;
        }

        if(currPage === numPage && numPage > 1) {
            return `
                <button data-go-to="${currPage - 1}" class="pagination__btn pagination__btn--left">
                    <i class="pagination__icon--left fas fa-long-arrow-alt-left"></i><span>${currPage - 1}</span>
                </button>
            `;
        }

        return '';
    }
}

export default new PaginationView();