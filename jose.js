document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link'); // Navigation links
    const sections = document.querySelectorAll('section'); // All sections
    const nav = document.querySelector('.nav-home'); // Navbar

    // Function to handle adding/removing the active class
    function setActiveLink() {
        let currentSection = null;

        // Determine the currently active section
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            // Check if section is in the viewport
            if (scrollY >= sectionTop - 300 && scrollY < sectionBottom - 300) {
                currentSection = section;
            }
            if (currentSection) {
                switch (currentSection.id) {
                    case 'Home':
                    case 'about-me':
                    case 'Resume':
                    case 'project':
                    case 'statistics':
                    case 'activities':
                    case 'contact':
                        // Reset all links
                        links.forEach((link) => link.classList.remove('active'));

                        // Highlight the link corresponding to the active section
                        const currentLink = document.querySelector(`.nav-home a[href="#${currentSection.id}"]`);
                        if (currentLink) {
                            currentLink.classList.add('active');
                        }
                        break;
                    default:
                        break;
                }
            }

        });


        // Add 'nav-scrolled' class if not on the 'Home' section
        if (currentSection.id == 'Home') {
            nav.classList.remove('nav-scrolled');
        } else {
            nav.classList.add('nav-scrolled');
        }
    }

    // Listen to scroll events to update the navbar
    window.addEventListener('scroll', setActiveLink);

    // Run the function on page load
    setActiveLink();
});



/*
document.addEventListener('DOMContentLoaded', () => {
            const links = document.querySelectorAll('.nav-link'); // Navigation links
            const sections = document.querySelectorAll('section'); // All sections
            const nav = document.querySelector('.nav-home'); // Navbar

            // Function to handle adding/removing the active class
            function setActiveLink() {
                let currentSection = null;

                // Determine the currently active section
                sections.forEach((section) => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    const activeSection = null;
                    // Check if section is in the viewport
                    if (scrollY >= sectionTop - 300 && scrollY < sectionBottom - 300) {
                        currentSection = section
                    }
                    if (currentSection) {

                        switch (currentSection.id) {
                            case 'Home':
                            case 'about-me':
                            case 'Resume':
                            case 'project':
                            case 'statistics':
                            case 'activities':
                            case 'contact':
                                // Reset all links
                                links.forEach((link) => link.classList.remove('active'));

                                // Highlight the link corresponding to the active section
                                const currentLink = document.querySelector(`.nav-home a[href="#${currentSection.id}"]`);
                                if (currentLink) {
                                    currentLink.classList.add('active');
                                }
                                break;
                            default:

                                break;
                        }
                    }
                });


                /*
            // Add 'nav-scrolled' class if not on the 'Home' section
            if (currentSection.id !== 'Home') {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }



                // Listen to scroll events to update the navbar
                window.addEventListener('scroll', setActiveLink);

                // Run the function on page load
                setActiveLink();
            });


        /*
        document.addEventListener('DOMContentLoaded', () => {
            const links = document.querySelectorAll('.nav-link'); // Get navigation links
            const sections = document.querySelectorAll('section'); // Get all sections
            const nav = document.querySelector('.nav-home'); // Get the nav element

            // Function to handle adding/removing the active class
            function setActiveLink() {
                // Loop through each section and check if it's in the viewport
                let currentSection = null;
                const activeSection = document.querySelector(`#Home`);
                console.log(activeSection.id);

                sections.forEach((section) => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    // If the section is in view, set it as the current section
                    if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionBottom - window.innerHeight / 2) {
                        currentSection = section;
                    }
                });

                switch (currentSection.id) {
                    case 'Home':
                        console.log(currentSection.id);
                        activeSection.id = currentSection.id;
                        break;
                    case 'about-me':
                        console.log(currentSection.id);
                        activeSection.id = currentSection.id;
                        break;
                    case 'Resume':
                        console.log(currentSection.id);
                        activeSection.id = currentSection.id;
                        break;
                    case 'project':
                        console.log(currentSection.id);
                        activeSection.id = currentSection.id;
                        break;
                    case 'statistics':
                        console.log(currentSection.id);
                        activeSection.id = currentSection.id;
                        break;
                    case 'contact':
                        console.log(currentSection.id);
                        activeSection.id = currentSection.id;

                        break;
                    default:
                        break;
                }

                // If a section is in view, highlight the corresponding nav link
                if (currentSection) {
                    // Reset all links
                    links.forEach((link) => link.classList.remove('active'));

                    // Find the corresponding link for the current section
                    const currentLink = document.querySelector(`.nav-home a[href="#${activeSection.id}"]`);
                    if (currentLink) {
                        currentLink.classList.add('active');
                        activeSection = currentLink;
                    }

                    // Add 'nav-scrolled' class if we're not on the 'Home' section
                    if (currentSection && currentSection.id !== 'Home') {
                        nav.classList.add('nav-scrolled');
                    } else {
                        nav.classList.remove('nav-scrolled');
                    }
                }
            }

            // Listen to scroll events to update the navbar
            window.addEventListener('scroll', setActiveLink);

            // Run the function on page load in case we're not at the top
            setActiveLink();
        });

        */



/*document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link'); // Get navigation links
    const sections = document.querySelectorAll('section'); // Get all sections
    const nav = document.querySelector('.nav-home'); // Get the nav element
    /*
        // Function to handle adding/removing the active class
        function setActiveLink() {
            // Loop through each section and check if it's in the viewport
            let currentSection = null;
            let activeSection = null;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                // If the section is in view, set it as the current section
                if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionBottom - window.innerHeight / 2) {
                    currentSection = section;
                    console.log(currentSection);
                }
    
            });

    function setActiveLink() {
        // Loop through each section and check if it's in the viewport
        let currentSection = null;
        let activeSection = document.querySelector(`.nav-home a[href="#Home"]`);;
        const flag = 0;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            // If the section is in view, set it as the current section
            if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionBottom - window.innerHeight / 2) {
                currentSection = section;
                console.log(currentSection);
            }
        });

        switch (currentSection) {
            case document.querySelector(`.nav-home a[href="#Home"]`):
                console.log(" I am here ------>>>>> 1")
                break;
            case document.querySelector(`.nav-home a[href="#about-me"]`):
                console.log(" I am here ------>>>>> 2")
                break;
            case document.querySelector(`.nav-home a[href="#Resume"]`):
                console.log(" I am here ------>>>>> 3")
                break;
            case document.querySelector(`.nav-home a[href="#project"]`):
                console.log(" I am here ------>>>>> 4")
                break;
            case document.querySelector(`.nav-home a[href="#statistics"]`):
                console.log(" I am here ------>>>>> 5")
                break;
            case document.querySelector(`.nav-home a[href="#contact"]`):
                console.log(" I am here ------>>>>> 6")
                break;
            default:
                // code block
        }

    }



    // If a section is in view, highlight the corresponding nav link
    if (flag == 0 && currentSection != activeSection) {

        // Reset all links
        links.forEach((link) => link.classList.remove('active'));

        // Find the corresponding link for the current section
        const currentLink = document.querySelector(`.nav-home a[href="#${currentSection.id}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
            activeSection = currentLink;

        }

        // Add 'nav-scrolled' class if we're not on the 'Home' section
        if (currentSection.id !== 'Home') {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }
}

// Listen to scroll events to update the navbar
window.addEventListener('scroll', setActiveLink);

// Run the function on page load in case we're not at the top
setActiveLink();
});

/*
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
});
*/

/*

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-home a');
    const sections = document.querySelectorAll('section'); // Assuming sections have unique IDs
    const nav = document.querySelector('.nav-home');
    const hline = document.querySelector('.hr-home');
    const disappearPoint = 220; // Pixels to scroll before hiding navbar
    const sectionOne = document.querySelector('.section-1'); // First section
    const sectionOneEnd = sectionOne.offsetTop + sectionOne.offsetHeight; // End of first section

    function getCurrentSection() {
        let currentSection = null;

        // Loop through each section to check which one is currently in view
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            // Check if the section is in the viewport
            if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionBottom - window.innerHeight / 2) {
                currentSection = section;
            }
        });

        return currentSection;
    }

    // Scroll event to handle navbar and section highlighting
    window.addEventListener('scroll', function() {
        const currentSection = getCurrentSection();

        if (currentSection) {
            // Reset active link class
            links.forEach((link) => link.classList.remove('active'));

            console.log(`Currently viewing section: ${currentSection.id}`);


            // Find the corresponding nav link for the current section
            const currentLink = document.querySelector(`.nav-home a[href="#${currentSection.id}"], .nav-scrolled a[href="#${currentSection.id}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }

        // Show or hide navbar
        if (scrollY < disappearPoint) {
            nav.classList.remove('hidden');
            hline.classList.remove('hidden');
            nav.classList.add('nav-home');
            nav.classList.remove('nav-scrolled', 'nav-home-scrolled');
        } else if (scrollY > disappearPoint && scrollY < sectionOneEnd) {
            nav.classList.add('hidden');
            hline.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
            nav.classList.add('nav-scrolled', 'nav-home-scrolled');
        }



    });
});

*/

/*

window.addEventListener('scroll', function() {

    let links = document.querySelectorAll('.nav-home a');
    let bodyId = document.querySelector("body").id;

    for (let link of links) {
        if (link.dataset.active == bodyId) {
            link.classList.add("active");

        }
    }

    const nav = document.querySelector('.nav-home');
    const hline = document.querySelector('.hr-home');
    const sectionOne = document.querySelector('.section-1'); // Target the first section
    const disappearPoint = 220; // Number of pixels to scroll before hiding navbar
    const sectionOneEnd = sectionOne.offsetTop + sectionOne.offsetHeight; // End of the first section

    // Check if scrollY is greater than disappearPoint but less than the end of the first section


    if (this.window.scrollY < disappearPoint) {
        nav.classList.remove('hidden'); // Add hidden class to navbar
        hline.classList.remove('hidden');
        nav.classList.add('nav-home');
        nav.classList.remove('nav-scrolled');
        nav.classList.remove('nav-home-scrolled');



    } else if (window.scrollY > disappearPoint && window.scrollY < sectionOneEnd) {
        nav.classList.add('hidden'); // Add hidden class to navbar
        hline.classList.add('hidden'); // Add hidden class to horizontal line
    } else {
        nav.classList.remove('hidden'); // Remove hidden class to show navbar
        //hline.classList.remove('hidden'); // Remove hidden class for horizontal line
        nav.classList.add('nav-scrolled');
        nav.classList.add('nav-home-scrolled');

    }
});

*/