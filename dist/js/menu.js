export class Menu {
    constructor() {
        this.responsive();
    }
    ;
    responsive() {
        const openMenu = document.querySelector('[data-open-menu]');
        const closeMenu = document.querySelector('[data-close-menu]');
        const navigation = document.querySelector('[data-navigation]');
        openMenu.addEventListener('click', () => {
            navigation.style.right = 0;
        });
        closeMenu.addEventListener('click', () => {
            navigation.style.right = '-250px';
        });
    }
}
//# sourceMappingURL=menu.js.map