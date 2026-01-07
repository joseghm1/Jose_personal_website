// const { Children } = require("react");

/* -------------------------------------------------------
   SELECTORS
-------------------------------------------------------- */
const events = document.querySelectorAll('.event');
const timeline = document.querySelector('.events');
const cards = document.querySelectorAll('.card');
const arrows = document.querySelectorAll('.job-arrow');

const projectCard = document.querySelectorAll('.project-card');
const links = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const nav = document.querySelector('.nav-home');

const overlay = document.getElementById('overlay');
const overlayMenu = document.getElementById('overlay-1');

const responsiveMenu = document.getElementById('menu-icon');
const closeMenu = document.getElementById('menu-close');



const responsiveMenuSide = document.querySelector('.responsive-menu-side');

const menuTabs = document.querySelectorAll('.responsive-tab');

console.log(responsiveMenuSide)

// console.log(responsiveMenu)
/* -------------------------------------------------------
   GALLERY DATA
-------------------------------------------------------- */
const galleryFolders = ['universal-pics', 'founder-pics', 'amazon-pics', 'ai-research', 'student-pics', 'associate-pics', 'founder-pics', 'ucf-student-pics', 'graduation-pics'];
const galleryLengths = [4, 5, 3, 3, 2, 1, 5, 2, 5]; // number of images per folder
const galleryIndexes = [1, 1, 1, 1, 1, 1, 1, 1, 1]; // current index per gallery

/* -------------------------------------------------------
   HELPERS
-------------------------------------------------------- */
function extraButtons(card) {
    const buttons = card.querySelector('#project-buttons');
    if (!buttons) return;

    const buttonsArray = Array.from(buttons.querySelectorAll('button'));
    const buttonsQty = buttonsArray.length;

    const child = document.createElement('div');
    child.classList.add('project-content-extra');

    const hoverElement = document.createElement('div');
    hoverElement.classList.add('tooltip');

    if (buttonsQty > 3) {
        buttons.appendChild(child);
        child.textContent = `+${buttonsQty - 3}`;
    }

    const contentArray = [];
    buttonsArray.forEach((button, idx) => {
        if (idx > 2) {
            contentArray.push(button.textContent);
            button.style.display = "none";
        }
    });

    contentArray.forEach((t) => {
        const text = document.createElement('span');
        text.style.display = 'block';
        text.style.marginBottom = '5px';
        text.textContent = t;
        hoverElement.appendChild(text);
    });

    child.appendChild(hoverElement);
}

function clampIndex(i, len) {
    if (i < 1) return len;
    if (i > len) return 1;
    return i;
}

function lockScroll() {
    document.body.classList.add("modal-open");
}

function unlockScroll() {
    document.body.classList.remove("modal-open");
}

function closeModal() {
    overlay.classList.remove("open");
    unlockScroll();
    overlay.querySelector(".modal-gallery")?.remove();
}

/* -------------------------------------------------------
   PROJECT EXTRA BUTTONS
-------------------------------------------------------- */
projectCard.forEach(extraButtons);

/* -------------------------------------------------------
   OBSERVERS
-------------------------------------------------------- */
if (timeline) {
    new IntersectionObserver((e) => {
        if (e[0].isIntersecting) timeline.classList.add('line-visible');
    }).observe(timeline);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });

events.forEach(el => observer.observe(el));
cards.forEach(el => observer.observe(el));

const observerNavBar = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });

        menuTabs.forEach(tab => {
            const a = tab.closest("a");                 // wrapper anchor
            const href = a?.getAttribute("href");       // "#Home", "#Project", etc.
            tab.classList.toggle("active", href === `#${id}`);
        });
    });
}, { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 });

sections.forEach(section => observerNavBar.observe(section));

/* -------------------------------------------------------
   JOB DROPDOWNS
-------------------------------------------------------- */
arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
        const wrapper = arrow.closest(".job-section-wrapper");
        if (!wrapper) return;

        const jobCard = wrapper.querySelector(".job-card");
        const dropdown = wrapper.querySelector(".dropdown-section");

        arrow.classList.toggle("open");
        jobCard?.classList.toggle("open");
        dropdown?.classList.toggle("open");
    });
});

/* -------------------------------------------------------
   INLINE (NON-MODAL) GALLERIES - SAFE GUARDS
   (your existing .experience-media-wrapper sections)
-------------------------------------------------------- */
const experiences = document.querySelectorAll('.experience-media-wrapper');

experiences.forEach((gallery, index) => {
    const img = gallery.querySelector('img');
    const leftArrow = gallery.querySelector('.fa-angle-left');
    const rightArrow = gallery.querySelector('.fa-angle-right');
    const position = document.getElementById(`gallery-length-${index}`);

    // If any piece is missing, skip to avoid crashes
    if (!img || !leftArrow || !rightArrow || !position) return;
    if (!galleryFolders[index] || !galleryLengths[index]) return;

    img.src = `${galleryFolders[index]}/${galleryIndexes[index]}.JPG`;

    leftArrow.addEventListener("click", () => {
        galleryIndexes[index] = clampIndex(galleryIndexes[index] - 1, galleryLengths[index]);
        img.src = `${galleryFolders[index]}/${galleryIndexes[index]}.JPG`;
        position.textContent = `${galleryIndexes[index]} / ${galleryLengths[index]}`;
    });

    rightArrow.addEventListener("click", () => {
        galleryIndexes[index] = clampIndex(galleryIndexes[index] + 1, galleryLengths[index]);
        img.src = `${galleryFolders[index]}/${galleryIndexes[index]}.JPG`;
        position.textContent = `${galleryIndexes[index]} / ${galleryLengths[index]}`;
    });
});

/* -------------------------------------------------------
   MODAL OPEN (Event Delegation)
   Click anywhere inside .time-wrapper that contains .gallery-icon
-------------------------------------------------------- */
document.addEventListener("click", (e) => {
    const wrapper = e.target.closest(".time-wrapper");
    if (!wrapper || !wrapper.querySelector(".gallery-icon")) return;
    if (!overlay) return;

    const card = wrapper.closest(".content");


    const title = card.querySelector(".content-p")?.textContent.trim();
    const subtitle = card.querySelector(".content-secondary")?.textContent.trim();
    const caption = card.querySelector(".content-third")?.textContent.trim();

    // Optional: pick which gallery folder to use from HTML
    // Example: <div class="time-wrapper" data-gallery="0">...</div>
    const galleryId = Number(wrapper.dataset.gallery ?? 0);
    const folder = galleryFolders[galleryId] ?? galleryFolders[0];
    const len = galleryLengths[galleryId] ?? galleryLengths[0];

    // Ensure a single modal at a time
    overlay.querySelector(".modal-gallery")?.remove();

    overlay.classList.add("open");
    lockScroll();

    // Build modal
    const modal = document.createElement('div');
    modal.classList.add('modal-gallery');

    const mainTitle = document.createElement('div');
    mainTitle.classList.add('modal-title');
    mainTitle.textContent = title;

    const subTitle = document.createElement('div');
    subTitle.classList.add('modal-secondary');
    subTitle.textContent = subtitle;

    const modalThird = document.createElement('div');
    modalThird.classList.add('modal-third');
    modalThird.textContent = caption;

    const modalClose = document.createElement('div');
    modalClose.classList.add('modal-close');

    const closeSymbol = document.createElement('i');
    closeSymbol.classList.add('fa-solid', 'fa-xmark');

    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('experience-media-wrapper-modal');

    const image = document.createElement('img');
    const startIndex = galleryIndexes[galleryId] ?? 1;
    image.src = `${folder}/${startIndex}.JPG`;

    const leftSymbol = document.createElement('i');
    leftSymbol.classList.add('fa-solid', 'fa-angle-left');

    const rightSymbol = document.createElement('i');
    rightSymbol.classList.add('fa-solid', 'fa-angle-right');

    const positionMarker = document.createElement('div');
    positionMarker.classList.add('dropdown-media-index');
    positionMarker.textContent = `${startIndex} / ${len}`;

    mediaContainer.append(leftSymbol, rightSymbol, image);
    modalClose.append(closeSymbol);
    modal.append(modalClose, mainTitle, subTitle, modalThird, mediaContainer, positionMarker);
    overlay.append(modal);

    // Modal navigation
    let current = startIndex;

    function setModalImage() {
        image.src = `${folder}/${current}.JPG`;
        positionMarker.textContent = `${current} / ${len}`;
        galleryIndexes[galleryId] = current; // persist state
    }

    leftSymbol.addEventListener("click", (ev) => {
        ev.stopPropagation();
        current = clampIndex(current - 1, len);
        setModalImage();
    });

    rightSymbol.addEventListener("click", (ev) => {
        ev.stopPropagation();
        current = clampIndex(current + 1, len);
        setModalImage();
    });

    closeSymbol.addEventListener("click", (ev) => {
        ev.stopPropagation();
        closeModal();
    });
});

/* -------------------------------------------------------
   MODAL CLOSE: click overlay background or press ESC
-------------------------------------------------------- */
if (overlay) {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay?.classList.contains("open")) closeModal();
});

responsiveMenu.addEventListener('click', () => {
    console.log('I am being clicked');
    overlayMenu.classList.add('open');
    responsiveMenuSide.classList.add('open');
})


closeMenu.addEventListener('click', () => {
    overlayMenu.classList.remove('open');
    responsiveMenuSide.classList.remove('open');
})

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        overlayMenu.classList.remove('open');
        responsiveMenuSide.classList.remove('open');
    })
})