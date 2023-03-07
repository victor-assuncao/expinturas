import { DataWorks } from "./data.js";

const dataWorks = new DataWorks().data;

const renderWorkCards = () => {
    
    const template = $('[data-work-card-template]').html();
    const cardsContainer = document.querySelector('[data-work-card-container]');
    let html = '';

    for (let i = 0 ; i < dataWorks.length ; i++) {
   
        html += Mustache.render(template, dataWorks[i]);
    }

    // dataWorks.forEach(element, () => {
    
    //     html = Mustache.render(template, element);
    // });

    cardsContainer.innerHTML = html;

    const worksSwiper = new Swiper(".slide-content", {
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
    
        breakpoints:{
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

function responsiveMenu () {

    const openMenu = document.querySelector('[data-open-menu]');
    const closeMenu = document.querySelector('[data-close-menu]');

    openMenu.addEventListener('click', () => {
        
        const navigation = document.querySelector('[data-navigation]');
        
        navigation.style.right = 0;
    });

    closeMenu.addEventListener('click', () => {
        
        const navigation = document.querySelector('[data-navigation]');
        
        navigation.style.right = '-250px';
    });
}

function slowScrollMenu () {

    const sections = [
        'home',
        'services',
        'about',
        'works',
        'contact'
    ]
    
    for (let i = 0 ; i < 5 ; i++) {
    
        const section = $('[data-section-' + sections[i] + ']');
        const sectionLinks = $('[data-link-' + sections[i] + ']');
        
        sectionLinks.on('click', () => {
            
            const DistanceOfTop = section.offset().top - 90; // 90px é o tamanho do header
    
            window.scrollTo({top: DistanceOfTop, behavior: 'smooth'});
        })
    };
}

function workDetail() {

    const buttons = document.querySelectorAll('[data-work-detail]');
    const header = document.querySelector('[data-header]');

    buttons.forEach(element => {

        element.addEventListener('click', (element) => {
            
            header.style.display = 'none';
            document.body.style.overflowY = 'hidden';

            renderWorkDetail(element.currentTarget.dataset.workIdentifier);
        })
    });

    const renderWorkDetail = (identifier) => {
        
        let template = $('[data-work-detail-template]').html();

        const work = dataWorks.find(item => item.identifier === identifier);
        const html = Mustache.render(template, {
            normal: work.workDetail.title.normal,
            emphasis: work.workDetail.title.emphasis,
            description: work.workDetail.description,
        })

        $('[data-section-works]').append(html);

        // Remove a seção workdetail da tela.

        const back = document.querySelector('[data-work-detail-back]');

        back.addEventListener('click', () => {
            
            header.style.display = 'flex'

            document.body.style.overflowY = 'scroll'

            $('[data-work-detail-section]').remove();
        })

        // Renderiza os slides.
    
        const numberOfSlides = work.workDetail.images.before.length;
        const container = $('[data-slides-container]');

        template = $('[data-work-detail-slide-template]').html();

        
        for (let i = 0 ; i < numberOfSlides ; i++) {

            let html = Mustache.render(template, {
                identifier: identifier,
                index: i + 1
            })

            container.append(html);
        };

        const workDetailSwiper = new Swiper(".workDetail__images", {
            pagination: {
                el: ".workDetail-pagination",
            },
        });
    };
};

responsiveMenu();
slowScrollMenu();
renderWorkCards();
workDetail();
