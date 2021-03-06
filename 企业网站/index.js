const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;

    if (window.pageYOffset - height > 600) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky");
    }

    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
});

const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 300,
        easing: "linear",
        delay: anime.stagger(300, { start: 200 }),
        translateY: [anime.stagger([40, 10]), 0]
    });
});

glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach(el => {
        el.style.opacity = 0;
    });
});

glide.mount();

const isotope = new Isotope(".cases", {
    layouMode: "fitRows",
    itemSelector: ".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
    let { target } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({ filter: filterOption });
    }
});

const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};

ScrollReveal().reveal(".feature", { staggeringOption, interval: 350 });

ScrollReveal().reveal('.service-item', {
    ...staggeringOption, interval: 300
})
ScrollReveal().reveal('.data-section', {
    beforeReveal: () => {
        anime({
            targets: '.data-piece .num',
            innerHTML: el => {
                return [0, el.innerHTML]
            },
            duration: 2000,
            round: 1,
            easing: 'easeInExpo'
        })
        dataSectionEl.style.backgroundPosition = `center calc(50%-${dataSectionEl.getBoundingClientRect().bottom}/5px)`
    }
})
window.addEventListener('scroll', () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom
    const top = dataSectionEl.getBoundingClientRect().top
    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50%-${bottom}/5px)`
    }
})


const scroll = new SmoothScroll('nav a[href*="#"],scrollToTop a[href*="#"]', {
    header: 'header',
    offset: 80
})



const exploreBtnEls = document.querySelectorAll('.explore-btn')

exploreBtnEls.forEach(exploreBtnEl => {
    exploreBtnEl.addEventListener('click', () => {
        scroll.animateScroll(document.querySelector('#about-us'))
    })
})
