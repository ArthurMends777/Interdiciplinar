let menuMobile = document.querySelector('.mobile-menu');
var slideIndex = 0;
const slides = document.querySelectorAll(".banner"),
dots = document.querySelectorAll(".dot"),
bgImg = document.getElementsByClassName("bg"),
imageToResizeHome = document.querySelector("img[alt='background-home']"),
imageToResizeTubetesHeros = document.querySelectorAll("img[alt='background-tubetes-herois']");

function menuShow() {
  if (menuMobile.classList.contains('open')) {
      menuMobile.classList.remove('open');
      document.querySelector('.icon').src = "src/img/menu_white_36dp.svg";
  } else {
      menuMobile.classList.add('open');
      document.querySelector('.icon').src = "src/img/close_white_36dp.svg";
  }
}

//Gerencia a troca de slides na HOME
function showSlides() {
  let widthWindow = window.innerWidth; //Captura o width da tela a cada chamada do intervalo para troca do background dos slides com base no dispostivo do úsuario
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
    bgImg[i].classList.remove("active");
  }
  
  //Estrutura condicional para troca do background com base no width do dispositivo 
  if(widthWindow <= 735){
    imageToResizeHome.src="./src/img/home_resized.jpeg"
    imageToResizeTubetesHeros.forEach(image=>{
      image.src="./src/img/tubetes_herois_resized.jpeg"
    })
  }else{
    imageToResizeHome.src="./src/img/home.jpeg"
    imageToResizeTubetesHeros.forEach(image=>{
      image.src="./src/img/tubetes_herois.jpeg"
    })
  }

  slideIndex++;

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  bgImg[slideIndex].classList.add("active");
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

var changeBgInterval = setInterval(showSlides, 4000); //Instanciação do intervalo como variavel para poder utilizar o "clearInterval()"

dots.forEach((dot, index)=>{ //Limpa o intervalo e dá aos "dots" um escutador que limpa o intervalo e troca o background para o index do respectivo dot clicado
  dot.addEventListener("click", ()=>{
    clearInterval(changeBgInterval)
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      dots[i].classList.remove("active");
      bgImg[i].classList.remove("active");
    }

    slideIndex = index; 

    bgImg[index].classList.add("active");
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    changeBgInterval = setInterval(showSlides, 4000); //Nova intanciação, pois o clearInterval limpa também o identificador ligado ao intervalo 
  })
})

//Código do menu carrosel

const controls = document.querySelectorAll(".control");
var currentItem = 0;
const items = document.querySelectorAll(".card");
const maxItems = items.length;

controls.forEach(control => {
  control.addEventListener("click", ()=>{
    const isLeft = control.classList.contains("left")
    let widthWindow = window.innerWidth; //Captura o width da tela a cada chamada do intervalo para troca do background dos slides com base no dispostivo do úsuario

    function isDeviceWidthSmaller(width){ //Com base na verificação do WIDTH do dispositvo está função retorna true ou false (responsividade)
      if(width<=735){
        return true
      }else{
        return false
      }
    }

    switch(isDeviceWidthSmaller(widthWindow)){ //Switch para definir o valor da troca dos slides pelo botões
      case true: //Caso o device seja menor 
        if(isLeft){
          currentItem -= 1
        }else{
          currentItem += 1
        }
        break;
      case false: //Caso o device seja maior
        if(isLeft){
          currentItem -= 3
        }else{
          currentItem += 3
        }
        break;
      default:
        console.error("ERRO: WIDTH NÃO INTERPRETADO!")
    }
      if(currentItem >= maxItems){ //Reinicia os slides para o inicial, caso ultrapasse o ultimo
          currentItem = 0
      }else if(currentItem < 0){
          currentItem = maxItems - 1
      }
      items.forEach(item => {
        item.classList.remove("current_card")
      })
      if(widthWindow <= 735){ //Centraliza o proximo slide a tela. Como só aparece um por vez este comando é necessario para telas menores
        items[currentItem].scrollIntoView({
          inline: "center",
          behavior: "smooth",
          block: "nearest"
      })}else{
          items[currentItem].scrollIntoView({ 
            inline: "start",
            behavior: "smooth",
            block: "nearest"
      })}

      items[currentItem].classList.add("current_card")
  })
})
