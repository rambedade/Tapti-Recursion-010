import { fetchIndexHTMl } from "./product.js";
// import {createCards} from "./index.js"
let url = "https://tapti-recursion-010-v93f.onrender.com/data?"
let cont = document.getElementById("cards");
fetchIndexHTMl();
let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
let wishlist = loggedIn.wishlist;
async function fetchData(url){
    try {
        // console.log(url);
        let res=await fetch(url);
        let data=await res.json();
        cont.innerHTML = "";
        data.forEach((det)=>{
            console.log(wishlist);
            if(wishlist.includes(det.id))
          cont.append(createCards(det));
        })
  
    } catch (error) {
        console.log(error);
    }
  }
  function createCards(det){
    let card=document.createElement("div");
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
    

  let carousalInner = carousel.querySelector(".carousel-inner");
  carousalInner.addEventListener("click", ()=>{gotoProducts(det.id)});
  details.addEventListener("click", ()=>{gotoProducts(det.id)});
  card.append(carousel,details);

  return card;
}

  
  fetchData(url);