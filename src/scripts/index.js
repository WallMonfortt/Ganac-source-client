import { isFormOpen, toggleFormOpen } from '../lib/donationState.js';

const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const hamburger = document.getElementById('hamburger');
const sideNav = document.getElementById('sideNav');
const donationBtn = document.getElementById('donacion');
const donateNowBtn = document.getElementById('donate-now')
const donateMonthlyBtn = document.getElementById('donate-monthly')
const paySingleBtn = document.getElementById('pay_single')
const payAngelBtn = document.getElementById('pay_angel')
const donationForm = document.getElementById('donationForm');
const closeFormBtn = document.getElementById('closeBtn');

let isMenuOpen = false;
let currentIndex = 0;

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

// navLinks listener
navLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    navLinks.forEach(link => link.classList.remove('selected'));
    isMenuOpen = false
    hamburger.classList.remove('active')
    sideNav.classList.toggle('open', isMenuOpen);

    this.classList.add('selected');
  });
});


//sections observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('selected'));
      navLink.classList.add('selected');
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

//   Hamburger listener 
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  isMenuOpen = !isMenuOpen;
  sideNav.classList.toggle('open', isMenuOpen);
});

donationBtn.addEventListener('click', () => {
  toggleFormOpen();
  donationForm.classList.toggle('open', isFormOpen.value)
  payAngelBtn.style.display = 'block'
  paySingleBtn.style.display = 'block'
})

donateNowBtn.addEventListener('click' , () => {
  toggleFormOpen();
  donationForm.classList.toggle('open', isFormOpen.value)
  payAngelBtn.style.display = 'none'
  paySingleBtn.style.display = 'block'
})

donateMonthlyBtn.addEventListener('click' , () => {
  toggleFormOpen();
  donationForm.classList.toggle('open', isFormOpen.value)
  paySingleBtn.style.display = 'none'
  payAngelBtn.style.display = 'block'
})

closeFormBtn.addEventListener('click', () => {
  donationForm.classList.remove('open')
  isFormOpen.value = false
})

//carousel logic
function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;
  currentIndex = (index + totalSlides) % totalSlides;
  const carouselInner = document.querySelector('.carousel-inner');
  if (carouselInner) {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
}

document.getElementById('nextBtn').onclick = function () {
  showSlide(currentIndex + 1);
};

document.getElementById('prevBtn').onclick = function () {
  showSlide(currentIndex - 1);
};

setInterval(() => showSlide(currentIndex + 1), 4000);

// Fde in
document.addEventListener("DOMContentLoaded", () => {
  const fadeInElements = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.20,
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  fadeInElements.forEach(element => {
    appearOnScroll.observe(element);
  });
});
