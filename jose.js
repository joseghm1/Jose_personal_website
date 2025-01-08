document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link'); // Navigation links
    const sections = document.querySelectorAll('section'); // All sections
    const nav = document.querySelector('.nav-home'); // Navbar
    const header = document.querySelector('.header-home'); // Navbar

    const sectionOne = document.querySelector('.shared-background'); // Target the first section
    const hline = document.querySelector('.hr-home');

    const sectionOneEnd = sectionOne.offsetTop + sectionOne.offsetHeight; // End of the first section
    let disappearPoint = 220;
    function tHold(){
        let query = window.matchMedia("(max-width: 550px)");
        if(query.matches){
         disappearPoint = 50; // Number of pixels to scroll before hiding navbar


        }else{
            disappearPoint = 220; // Number of pixels to scroll before hiding navbar

        }
    }
    tHold();

   

    // Function to handle adding/removing the active class
    function setActiveLink() {
        let currentSection = null;

        // Determine the currently active section
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = section.offsetHeight;

            // Check if section is in the viewport
            if (scrollY >= sectionTop - 60) {
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
                        // Add 'nav-scrolled' class if not on the 'Home' section
                        if (currentSection.id == 'Home') {

                            nav.classList.remove('hidden'); // Add hidden class to navbar
                            hline.classList.remove('hidden');
                            nav.classList.remove('nav-scrolled'); // Add hidden class to navbar
                            if (this.window.scrollY < disappearPoint) {
                                hline.style.opacity = '1';

                            }
                            if (this.window.scrollY > disappearPoint && this.window.scrollY < sectionOneEnd) {
                                hline.style.opacity = '0';

                                hline.style.height = '0px';
                                nav.classList.add('hidden'); // Add hidden class to navbar
                                hline.classList.add('hidden'); // Add hidden class to horizontal line
                            }
                        } else {
                            // Change the transition duration to something like 0.5 seconds
                            nav.classList.remove('hidden');
                            hline.classList.add('hidden'); // Add hidden class to horizontal line
                            nav.classList.add('nav-scrolled');
                        }
                        break;
                    default:
                        break;
                }
            }


        });



    }

    // Listen to scroll events to update the navbar
    window.addEventListener('scroll', setActiveLink);

    // Run the function on page load
    setActiveLink();
});