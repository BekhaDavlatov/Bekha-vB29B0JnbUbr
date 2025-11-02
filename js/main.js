
// addaptive sets
function getVisibleSlides() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1024) return 3;
    return 5; // по умолчанию
}
function getVisibleReviews() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1024) return 3;
    return 4;
}




// begining of the background switcher 


function changeTheme(event) {
    const selectedTheme = event.currentTarget.getAttribute("data-theme");

    document.documentElement.classList.add("color-theme-in-transition");

    setTimeout(() => {
        document.documentElement.classList.remove("color-theme-in-transition");
    }, 300);

    document.documentElement.setAttribute("data-theme", selectedTheme);

}
// end of background switcher 



// carousel of templates 

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.right');
const prevBtn = document.querySelector('.carousel-btn.left');

let visibleSlides = getVisibleSlides();

const clonesStart = slides.slice(-visibleSlides).map(s => s.cloneNode(true));
const clonesEnd = slides.slice(0, visibleSlides).map(s => s.cloneNode(true));

clonesStart.forEach(clone => track.prepend(clone));
clonesEnd.forEach(clone => track.appendChild(clone));

let currentIndex = visibleSlides;
const realCount = slides.length;

function updateTemplateCarousel(transition = true) {
    track.style.transition = transition ? 'transform 0.4s ease' : 'none';
    const slideWidth = slides[0].getBoundingClientRect().width + 15;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

updateTemplateCarousel(false);

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex++;
    updateTemplateCarousel();

    if (currentIndex === realCount + visibleSlides) {
        setTimeout(() => {
            currentIndex = visibleSlides;
            updateTemplateCarousel(false);
        }, 400);
    }
});

prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex--;
    updateTemplateCarousel();

    if (currentIndex === 0) {
        setTimeout(() => {
            currentIndex = realCount;
            updateTemplateCarousel(false);
        }, 400);
    }
});

window.addEventListener('resize', () => {
    visibleSlides = getVisibleSlides();
    visibleCount = getVisibleReviews();
    updateTemplateCarousel();
    updateReviewCarousel();
});


// end of carousel templates 

// review section


const reviewTrack = document.querySelector('.review-track');
const reviewCards = Array.from(reviewTrack.children);

const reviewNext = document.querySelector('.review-arrow.right');
const reviewPrev = document.querySelector('.review-arrow.left');

let visibleCount = getVisibleReviews();
const clones = reviewCards.slice(0, visibleCount).map(c => c.cloneNode(true));
clones.forEach(clone => reviewTrack.appendChild(clone));

let reviewIndex = 0;
const reviewMax = reviewCards.length;

function updateReviewCarousel(transition = true) {
    reviewTrack.style.transition = transition ? 'transform 0.6s ease' : 'none';
    const cardWidth = reviewCards[0].getBoundingClientRect().width + 20;
    reviewTrack.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
}

reviewNext.addEventListener('click', (e) => {
    e.preventDefault();
    reviewIndex++;
    updateReviewCarousel();
    if (reviewIndex === reviewMax) {
        setTimeout(() => {
            reviewIndex = 0;
            updateReviewCarousel(false);
        }, 400);
    }
});

reviewPrev.addEventListener('click', (e) => {
    e.preventDefault();
    if (reviewIndex > 0) {
        reviewIndex--;
        updateReviewCarousel();
    }
});

window.addEventListener('resize', () => updateReviewCarousel());
updateReviewCarousel();


