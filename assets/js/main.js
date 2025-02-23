/*=============== SHOW POP UP DESCRIP. ===============*/
const showModal = (openButtonIds, modalContentIds) => {
    openButtonIds.forEach((openButtonId, index) => {
        const openBtn = document.getElementById(openButtonId);
        const modalContainer = document.getElementById(modalContentIds[index]);
        
        if (openBtn && modalContainer) {
            openBtn.addEventListener('click', () => {
                modalContainer.classList.add('show-modal');
            });
        }
    });
}

const openButtonIds = ['open-modal', 'open-modal1', 'open-modal2', 'open-modal3', 'open-modal4',
                       'open-modal5',]; 
const modalContentIds = ['modal-container', 'modal-container1', 'modal-container2', 'modal-container3',
                         'modal-container4', 'modal-container5',]; 

showModal(openButtonIds, modalContentIds);


/*=============== CLOSE POP UP DESCRIP. ===============*/
const closeBtns = document.querySelectorAll('.close-modal');

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modalContainer = closeBtn.closest('.modal__container');
        modalContainer.classList.remove('show-modal');
    });
});


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}
 

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
   const header = document.getElementById('header')
   // When the scroll is greater than 50 viewport height, add the blur-header class to the header tag
   this.scrollY >= 50 ? header.classList.add('blur-header') 
                      : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)


/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    opacity: 1,
    scale: 1.1,
    duration: 2500,
    delay: 300,
    // reset: true, // Animations repeat
})
  
sr.reveal(`.home__data, .abou2t__img, .about2__data, .visit__data`)

sr.reveal(`.home__image, .footer__img-1, .footer__img-2`, { rotate: {z: -15} })
sr.reveal(`.home__bread, .about__bread`, { rotate: {z: 15} })
sr.reveal(`.home__footer`, { scale: 1, origin: 'bottom' })

sr.reveal(`.about1__card:nth-child(1) img`, { rotate: {z: -30}, distance: 0 })
sr.reveal(`.about1__card:nth-child(2) img`, { rotate: {z: 15}, distance: 0, delay: 600 })
sr.reveal(`.about1__card:nth-child(3) img`, { rotate: {z: -30}, distance: 0, delay: 900 })

sr.reveal(`.footer__container`, { scale: 1 })
sr.reveal(`.series__card img`, { interval: 100, rotate: {z: 15}, distance: 0 })
