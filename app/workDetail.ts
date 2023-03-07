import { DataWorks } from "./data.js";

declare const Mustache: any;
declare const Swiper: any;
declare const $: any;

export class WorkDetail {

    constructor() {

        this.open();
    };

    open() {

        const buttons = document.querySelectorAll('[data-work-detail]');
        const header: HTMLHeadElement = document.querySelector('[data-header]');
    
        buttons.forEach(element => {
    
            element.addEventListener('click', (element: any) => {
                
                header.style.display = 'none';
                document.body.style.overflowY = 'hidden';
    
                this.renderWorkDetail(element.currentTarget.dataset.workIdentifier);
            })
        });
    };

    renderWorkDetail(identifier: String)  {
        
        const data = new DataWorks().data;
        const template = $('[data-work-detail-template]').html();
        const work = data.find(item => item.identifier === identifier);
        const html = Mustache.render(template, {
            normal: work.workDetail.title.normal,
            emphasis: work.workDetail.title.emphasis,
            description: work.workDetail.description,
        })

        $('[data-section-works]').append(html);

        this.close();
    };

    close() {

        const back = document.querySelector('[data-work-detail-back]');
        const header: HTMLHeadElement = document.querySelector('[data-header]');

        back.addEventListener('click', () => {
            
            header.style.display = 'flex'

            document.body.style.overflowY = 'scroll'

            $('[data-work-detail-section]').remove();
        })
    };
}