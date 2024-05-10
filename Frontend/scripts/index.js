
const menuIcon = document.querySelector('.button-icons');
const dropdownMenu = document.getElementById('dropdownMenu');

menuIcon.addEventListener('click', function() {
  dropdownMenu.classList.toggle('show');
});
// HIMANSHU------>>
let cont=document.getElementById("cards")
function createCards(det){
    let card=document.createElement("div");
    card.addEventListener("click",()=>{
      localStorage.setItem("currCard", det.id);
      window.location.assign("product.html")
    })
    let carousel =document.createElement("div");
    let details=document.createElement("div")
    card.classList.add("c1");
    carousel.classList.add("carousel");
    details.classList.add("details");

    details.innerHTML=`
    <div id="info">
    <span>${det.name.slice(0, 20)+"..."}</span>
    <span>|<span>
    <span><i class="fa-solid fa-star"></i> ${(det.review_scores_rating*5*0.01).toFixed(1)}</span>
    </div>
    <div id="info2">
    <span>${det.host_name}</span>
    <span>${det.smart_location}</span>
    <span>$ ${det.price} night</span>
    </div>
    `
    carousel.innerHTML=`
    <div id="carousel${det.id}" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carousel${det.id}" data-bs-slide-to="0" class="active" aria-label="Slide 1" aria-current="true"></button>
      <button type="button" data-bs-target="#carousel${det.id}" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
      <button type="button" data-bs-target="#carousel${det.id}" data-bs-slide-to="2" aria-label="Slide 3" class=""></button>
      <button type="button" data-bs-target="#carousel${det.id}" data-bs-slide-to="3" aria-label="Slide 4" class=""></button>
      <button type="button" data-bs-target="#carousel${det.id}" data-bs-slide-to="4" aria-label="Slide 5" class=""></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
      <img src="${det.images[0]}" class="d-block w-100 h-100" alt="First slide">
      </div>
      <div class="carousel-item">
      <img src="${det.images[1]}" class="d-block w-100 h-100" alt="First slide">
      </div>
      <div class="carousel-item">
      <img src="${det.images[2]}" class="d-block w-100 h-100" alt="First slide">
      </div>
      <div class="carousel-item">
      <img src="${det.images[3]}" class="d-block w-100 h-100" alt="First slide">
      </div>
      <div class="carousel-item">
      <img src="${det.images[4]}" class="d-block w-100 h-100" alt="First slide">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel${det.id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel${det.id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
    
card.append(carousel,details);
  return card;
}

async function fetchData(url){
  try {
      let res=await fetch(url);
      let data=await res.json();
    data.forEach((det)=>{
       
       cont.append(createCards(det));
    })

  } catch (error) {
      console.log(error);
  }
}
fetchData("https://tapti-recursion-010-v93f.onrender.com/data")
// Rameshwar /

document.addEventListener("DOMContentLoaded", function() {
    var popularDropdown = document.getElementById("popularDropdown");
    popularDropdown.classList.add("active");
    var popularContent = popularDropdown.querySelector(".dropdown-content");
    popularContent.style.display = "block";

    var dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener("click", function() {
            var currentContent = document.querySelector(".dropdown.active .dropdown-content");
            if (currentContent && currentContent.parentElement !== this) {
                currentContent.parentElement.classList.remove("active");
                currentContent.style.display = "none";
            }
            this.classList.toggle("active");
        });
    });
});
