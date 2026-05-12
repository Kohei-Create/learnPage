document.addEventListener('DOMContentLoaded', () => {
    const inner = document.querySelector('.card-inner');
    const prevBtn = document.querySelector('#prev');
    const nextBtn = document.querySelector('#next');
    const cardCount = document.querySelectorAll('.card').length;
    let counter =0;

    function updateSlider() {
        const card = document.querySelector('.card');
        if (!card) return;

        const cardWidth = card.clientWidth;

        const style = getComputedStyle(inner);
        const gapValue = parseFloat(style.gap) || 0;

        let moveDistance = (cardWidth + gapValue) * counter;
        inner.style.transform =`translateX(-${moveDistance}px)`;

        prevBtn.style.display = (counter === 0) ? 'none' : 'flex';
        
        nextBtn.style.display = (counter === cardCount -3) ? 'none' : 'flex';
    }

    nextBtn.addEventListener('click', () => {
        if (counter < cardCount -3) {
            counter++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            updateSlider();
        }
    });

    updateSlider();
});

//btn
const button = document.querySelector('.btn');
if (button) {
    button.addEventListener('click', () => {
        button.classList.toggle('active-color');
    });
}