let menuMobile = document.querySelector('.mobile-menu');

const slides = document.querySelectorAll(".banner");
const dots = document.querySelectorAll(".dot");
const bgImg = document.getElementsByClassName("bg");

let slideIndex = 0;

function menuShow() {
  if (menuMobile.classList.contains('open')) {
      menuMobile.classList.remove('open');
      document.querySelector('.icon').src = "src/img/menu_white_36dp.svg";
  } else {
      menuMobile.classList.add('open');
      document.querySelector('.icon').src = "src/img/close_white_36dp.svg";
  }
}


function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
    bgImg[i].classList.remove("active");
  }

  slideIndex++;

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  
  bgImg[slideIndex].classList.add("active");
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");

  setTimeout(showSlides, 4000);
}

showSlides();