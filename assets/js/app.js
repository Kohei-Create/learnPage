function createCard(item) {
    const el = document.createElement(item.tag);
    if (item.class) el.className = item.class;

    if (item.children) {
        item.children.forEach(child => {
            el.appendChild(createCard(child));
        });
    }
    return el;
}

const wrap = document.querySelector('.rect-wrap');

const clickBtn = document.querySelector('button');

if (clickBtn) {
    clickBtn.addEventListener('click', () => {
        const rectBox = document.querySelector('.rectangle');
        rectBox.classList.toggle('is-active');
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.card-inner');

    try {

        const configResponse = await fetch('./assets/data/card.json');
        if (!configResponse.ok) throw new Error('Config load failed');
        const config = await configResponse.json();

        config.cards.forEach(item => {
            container.appendChild(createCard(item));
        });

        const cards = document.querySelectorAll('.card');
        const cardCount = cards.length;
        let counter = 0;

        const inner = document.querySelector('.card-inner');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        function updateSlider() {
            const card = document.querySelector('.card');
            if (!card) return;

            const cardWidth = card.clientWidth;
            const style = getComputedStyle(inner);
            const gapValue = parseFloat(style.gap) || 0;

            let moveDistance = (cardWidth + gapValue) * counter;
            inner.style.transform = `translateX(-${moveDistance}px)`;

        }

        nextBtn.addEventListener('click', () => {
            if (counter < cardCount +1) {
                counter++;
            } else {
                counter = 0;
            }
            updateSlider();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            if (counter > 0) {
                counter--;
                updateSlider();
                resetAutoSlide();
            }
        });

        updateSlider();

        let autoSlideId

        function startAutoSlide() {
            autoSlideId = setInterval(() => {
                if (counter < cardCount +1) {
                counter++;
                } else {
                    counter = 0;
                }
                updateSlider();
            }, 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideId);
            startAutoSlide();
        }

        startAutoSlide();

        updateSlider();

    } catch (e) {
        console.error('config error', e);
        
        const container = document.querySelector('.card-inner');
        if (container) {
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = 'カードの読み込みに失敗しました、後でもう一度お試しください。';
            container.appendChild(errorMsg);
        }
    }
});