import { DataWorks } from "./data.js";
export class Work {
    constructor() {
        this.renderSwiper();
        this.renderCards();
    }
    ;
    renderSwiper() {
        const swiper = new Swiper(".slide-content", {
            slidesPerView: 3,
            spaceBetween: 25,
            centerSlide: 'true',
            fade: 'true',
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                772: {
                    slidesPerView: 2,
                },
                1103: {
                    slidesPerView: 3,
                },
            },
        });
    }
    ;
    renderCards() {
        const data = new DataWorks().data;
        console.log(data);
        const template = $('[data-work-card-template]').html();
        const cardsContainer = document.querySelector('[data-work-card-container]');
        let html = '';
        data.forEach(element => {
            html += Mustache.render(template, element);
        });
        cardsContainer.innerHTML = html;
    }
    ;
}
;
//# sourceMappingURL=work.js.map