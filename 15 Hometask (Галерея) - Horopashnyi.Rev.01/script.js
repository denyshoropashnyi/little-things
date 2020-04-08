'use strict';
class Gallery {
    constructor(el, {
        delay
    }) {
        this.el = el;
        this.delay = delay;
        this.currentPosition = 0;
        this.imgWidth = 444;
        this.imageCounter = el.children.length;

        this.init();
    }

    init() {
        this.createElements();
        this.addHandlers();
        this.runTimeout();
    }

    createElements() {
        const galleryContainer = document.createElement('div');
        galleryContainer.classList.add('gallery-container');

        this.btnPrevImg = document.createElement('button');
        this.btnPrevImg.classList.add('btn-prev-img');
        this.btnPrevImg.innerHTML = ('&#8678;');

        this.btnNextImg = document.createElement('button');
        this.btnNextImg.classList.add('btn-next-img')
        this.btnNextImg.innerHTML = ('&#8680;');

        document.body.insertBefore(galleryContainer, document.body.firstChild);
        galleryContainer.appendChild(this.el);
        galleryContainer.prepend(this.btnPrevImg);
        galleryContainer.appendChild(this.btnNextImg);
    }

    showNextImg() {
        if (this.currentPosition + 1 !== this.imageCounter) {
            this.currentPosition++;
            this.switchImg();
        }
    }

    showPrevImg() {
        if (this.currentPosition + 1 !== 0) {
            this.currentPosition--;
            this.switchImg();
        }
    }

    addHandlers() {
        this.btnNextImg.addEventListener('click', this.showNextImg.bind(this), false);
        this.btnPrevImg.addEventListener('click', this.showPrevImg.bind(this), false);
    }

    runTimeout() {
        const interval = setInterval(() => {
            this.showNextImg();

            if (this.currentPosition + 1 === this.imageCounter) {
                clearInterval(interval);
            }
        }, this.delay);
    }

    showCurrentImage(index) {
        this.currentPosition = index;
        this.switchImg();
        this.runTimeout();
    }

    switchImg() {
        this.el.style.transform = `translateX(-${this.currentPosition * this.imgWidth}px)`;
    }
};

const gallery = new Gallery(document.getElementById('container'), {
    delay: 2222
});