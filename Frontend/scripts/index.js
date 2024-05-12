var  baseURL = "https://tapti-recursion-010-v93f.onrender.com/data?"; 
const menuIcon = document.querySelector('.button-icons');
const dropdownMenu = document.getElementById('dropdownMenu');
let pages = document.getElementById("pages");
let previous = document.getElementById("prev-page-button");
let next = document.getElementById("next-page-button");
menuIcon.addEventListener('click', function() {
  dropdownMenu.classList.toggle('show');
});

// HIMANSHU------>>
let cont=document.getElementById("cards")
function gotoProducts(id){
  localStorage.setItem("currCard", id);
  window.location.assign("product.html")
}

function createCards(det){
    let card=document.createElement("div");
    let carousel =document.createElement("div");
    let details=document.createElement("div")
    card.classList.add("c1");
    carousel.classList.add("carousel");
    details.classList.add("details");
    let favbutton=document.createElement("button");
    favbutton.innerHTML=`
    <i class="fa-regular fa-heart fa-sm"></i>`
    favbutton.classList.add("favorite-button");
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
  card.append(carousel,details,favbutton);

  return card;
}
var currPage = 1;
var lastPage = 0;
async function fetchData(page,url){
  try {
      console.log(url);
      let res=await fetch(url+`&_page=${page}&_limit=12`);
      let total_data = res.headers.get("X-Total-Count");
      let data=await res.json();
      cont.innerHTML = "";
      pages.innerHTML = "";
      data.forEach((det)=>{
        cont.append(createCards(det));
      })
      currPage = page;
      console.log(page);
      pagining(page,total_data);

  } catch (error) {
      console.log(error);
  }
}
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



// Pagination code here 
async function pagining(page, total_data){

  let first_page = document.createElement("div");
  let last_page = document.createElement("div");
  let prev_page = document.createElement("div");
  let next_page = document.createElement("div");
  let middle_page = document.createElement("div");
  let rest_page = document.createElement("div");
  let rest_page1 = document.createElement("div");
  rest_page.innerText = "....";
  rest_page1.innerText = "....";

  middle_page.id = "mid-page";
  lastPage = Math.ceil(total_data/12);
  middle_page.innerText = page;
  first_page.innerText = 1;
  last_page.innerText = lastPage;
  prev_page.innerText = page-1;
  next_page.innerText = page+1;
  // console.log(page);
  if(page == 1 ){
    previous.src = "assets/prev-dis.png";
    next.src = "assets/next-enb.png";
    pages.append(middle_page,next_page,rest_page,last_page);

  }
  else if(page == 2){
    previous.src = "assets/prev-enb.png";
    next.src = "assets/next-enb.png";

    pages.append(prev_page,middle_page,next_page,rest_page,last_page);
  }
  else if(page == lastPage) {
    previous.src = "assets/prev-enb.png";
    next.src = "assets/next-dis.png";
    pages.append(first_page,rest_page,prev_page,middle_page);
  }
  else if( page == lastPage-1){
    previous.src = "assets/prev-enb.png";
    next.src = "assets/next-enb.png";
    pages.append(first_page,rest_page,prev_page,middle_page,next_page);
  }
  else{
    previous.src = "assets/prev-enb.png";
    next.src = "assets/next-enb.png";
    pages.append(first_page,rest_page,prev_page,middle_page,next_page,rest_page1,last_page);
  }
  


  first_page.addEventListener("click",()=>{
    page = 1;
    fetchData(page,baseURL);
  })
  last_page.addEventListener("click",()=>{
    page = lastPage;
    fetchData(page,baseURL);
  })
  next_page.addEventListener("click",()=>{
    page++;
    fetchData(page,baseURL);
  })
  prev_page.addEventListener("click",()=>{
    page--;
    fetchData(page,baseURL);
  })
}

next.addEventListener("click",()=>{
  if(currPage < lastPage){
    currPage++;
    fetchData(currPage,baseURL);
  }
})

previous.addEventListener("click",()=>{
  if(currPage > 1){
    currPage--;
    fetchData(currPage,baseURL);
  }
})

let searchDest = document.getElementById("search-destination");
let searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e)=>{
  e.preventDefault();
  searchFunction();
});
function searchFunction(){
  let filterString = searchDest.value;
  baseURL+=`&smart_location_like=${filterString}`
  
  fetchData(currPage,baseURL);
}

fetchData(currPage,baseURL)

