const slides = [
  {src:"../assets/images/kitchart-packaging.png", alt:"Packaging Kitchart"},
  {src:"../assets/images/kitchart-creative.png", alt:"Kitchart en situation"},
  {src:"../assets/images/pizza-closeup.png", alt:"Pizza croustillante"},
  {src:"../assets/images/chef-kitchart.png", alt:"Pizza maison"}
];

const mainImage = document.getElementById("mainImage");
const thumbs = [...document.querySelectorAll(".thumb")];
const currentSlide = document.getElementById("currentSlide");
const totalSlides = document.getElementById("totalSlides");
let index = 0;

totalSlides.textContent = slides.length;

function showSlide(i){
  index = (i + slides.length) % slides.length;
  mainImage.style.opacity = "0.35";
  setTimeout(() => {
    mainImage.src = slides[index].src;
    mainImage.alt = slides[index].alt;
    currentSlide.textContent = index + 1;
    thumbs.forEach((t,n)=>t.classList.toggle("active", n === index));
    mainImage.style.opacity = "1";
  }, 100);
}

document.querySelector(".next").addEventListener("click", ()=>showSlide(index + 1));
document.querySelector(".prev").addEventListener("click", ()=>showSlide(index - 1));
thumbs.forEach((thumb,n)=>thumb.addEventListener("click",()=>showSlide(n)));

let startX = 0;
let endX = 0;
mainImage.addEventListener("touchstart", e => startX = e.touches[0].clientX, {passive:true});
mainImage.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  const delta = endX - startX;
  if(Math.abs(delta) > 45) showSlide(delta < 0 ? index + 1 : index - 1);
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
