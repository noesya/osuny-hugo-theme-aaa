import Splide from '@splidejs/splide';

Splide.defaults = {
    i18n: {
        first: 'Aller au premier slide',
        last: 'Aller au dernier slide',
        next: 'Slide suivant',
        pageX: 'Aller à la page %s',
        pause: 'Mettre en pause le carousel',
        play: 'Démarrer le carousel',
        prev: 'Slide précedent',
        slideX: 'Aller au slide %s'
    }
};

class Carousel {
    constructor (element) {
        this.element = element;
        this.init();
    }

    init () {
        var splide = new Splide(this.element).mount(),
            toggleButton = splide.root.querySelector('.splide__autoplay'),
            stepButtons = splide.root.querySelectorAll('.splide__pagination button'),
            elements = splide.root.querySelectorAll('.splide__pagination, .splide__slide'),
            autoplay = splide.Components.Autoplay;


        if (toggleButton) {
            stepButtons.forEach((stepButton) => {
                stepButton.innerHTML = '<i></i>';
            });

            splide.on('autoplay:play', function () {
                toggleButton.classList.add('is-active');
            });

            splide.on('autoplay:playing', function (rate) {
                var activeStepButton = splide.root.querySelector('.splide__pagination .is-active i');
                activeStepButton.style.width = rate * 100 + '%';
            });

            splide.on('autoplay:pause', function () {
                toggleButton.classList.remove('is-active');
            });

            elements.forEach(function(element) {
                element.addEventListener('click', () => {
                    autoplay.pause();
                })
            });

            splide.on('drag', function() {
                autoplay.pause();
            });
        }
    }
}

(function () {
    var splides = document.getElementsByClassName('splide'),
        i = 0;
    for (i = 0; i < splides.length; i+=1) {
        new Carousel(splides[i]);
    }
}());
