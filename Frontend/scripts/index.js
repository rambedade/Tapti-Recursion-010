var  baseURL = "https://tapti-recursion-010-v93f.onrender.com/data?"; 
const menuIcon = document.querySelector('.button-icons');
const dropdownMenu = document.getElementById('dropdownMenu');
let pages = document.getElementById("pages");
let previous = document.getElementById("prev-page-button");
let next = document.getElementById("next-page-button");
let loading = document.getElementById("loading");

menuIcon.addEventListener('click', function() {
  dropdownMenu.classList.toggle('show');
});
function showLoading(){
  let img = document.createElement("img");
  img.src = "assets/ZKZg.gif"
  loading.append(img);
}

function stopLoading(){
  loading.innerHTML = "";
}

// HIMANSHU------>>
let cont=document.getElementById("cards")
function gotoProducts(id){
  localStorage.setItem("currCard", id);
  window.location.assign("product.html")
}

export function createCards(det){
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
    

  favbutton.addEventListener("click",()=>{
    if(favbutton.innerHTML != `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`){
      favbutton.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`
      addToWishlist(det.id);
    }
    else{
      favbutton.innerHTML = `<i class="fa-regular fa-heart fa-sm"></i>`
      removeFromWishlist(det.id);
    }
  })
  let carousalInner = carousel.querySelector(".carousel-inner");
  carousalInner.addEventListener("click", ()=>{gotoProducts(det.id)});
  details.addEventListener("click", ()=>{gotoProducts(det.id)});
  card.append(carousel,details,favbutton);

  return card;
}

async function addToWishlist(objId){
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  if(loggedIn){
    let wishlist = loggedIn.wishlist;
    wishlist.push(objId);
    localStorage.setItem("loggedIn",JSON.stringify(loggedIn));
    try{
      await fetch(`https://tapti-recursion-010-v93f.onrender.com/users/${loggedIn.id}`, {
        method:"PATCH",
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({"wishlist":wishlist})
      })
    }
    catch(err){
      console.log(err);
    }
    }
    else{
      alert("You are not logged in");
      window.location.assign("login.html");
    }
}

var currPage = 1;
var lastPage = 0;
async function fetchData(page,url){
  showLoading();
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
  stopLoading();
}
// Rameshwar /

document.addEventListener("DOMContentLoaded", function() {
  // Show only the Popular list on page load
  toggleList('popular');
});

// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById('popularListSection').style.display = 'block';
// });

// Function to toggle list visibility
function toggleList(listName) {
  var lists = document.querySelectorAll('.list');
  lists.forEach(function(list) {
      list.style.display = 'none';
  });

  document.getElementById(listName + 'ListSection').style.display = 'flex';
}


// Function to add Popular list dynamically
function addPopularList() {
  var popularList = document.getElementById('popularListSection');
  popularList.innerHTML = ''; // Clear previous content

  // List of popular places
  var popularPlaces = [
      ["Canmore", "Flat rentals"],
      ["Benalmádena", "Beach house rentals"],
      ["Marbella", "Holiday rentals"],
      ["Mijas", "House rentals"],
      ["Prescott", "Pet-friendly rentals"],
      ["Scottsdale", "Rentals with pools"],
      ["Tucson", "Pet-friendly rentals"],
      ["Jasper", "Cabin rentals"],
      ["Mountain View", "Holiday rentals"],
      ["Devonport", "Cottage rentals"],
      ["Mallacoota", "Holiday rentals"],
      ["Ibiza", "Holiday rentals"],
      ["Anaheim", "House rentals"],
      ["Monterey", "House rentals"],
      ["Paso Robles", "Cottage rentals"],
      ["Santa Barbara", "Cottage rentals"],
      ["Sonoma", "Pet-friendly rentals"],
      ["La Serena", "Holiday rentals"]
  ];

  // Add popular places to list
  // popularPlaces.forEach(function(place) {
  //     var pair = document.createElement('div');
  //     pair.classList.add('list-pair');

  //     var first = document.createElement('a');
  //     first.href = '#';
  //     first.innerText = place[0];
  //     first.style.fontWeight = 'bold'; // Make the first name bold

  //     var second = document.createElement('a');
  //     second.href = '#';
  //     second.innerText = place[1];

  //     pair.appendChild(first);
  //     pair.appendChild(second);

  //     popularList.appendChild(pair);
  // });
  popularPlaces.forEach(function(place) {
      var pair = document.createElement('div');
      pair.classList.add('list-pair');
      pair.innerHTML = `<div>${place[0]}</div><div>${place[1]}</div>`;

      popularList.appendChild(pair);
  });
}

// Add Popular list on page load
addPopularList();


function addArtsCultureList() {
  var artsCultureList = document.getElementById('artsCultureListSection');
  artsCultureList.innerHTML = ''; // Clear previous content

  // List of Arts & Culture places
  var artsCulturePlaces = [
      ["Phoenix", "House rentals"],
      ["Hot Springs", "Apartment rentals"],
      ["Los Angeles", "Holiday rentals"],
      ["San Diego", "Apartment rentals"],
      ["San Francisco", "Holiday rentals"],
      ["Barcelona", "Holiday rentals"],
      ["Prague", "Holiday rentals"],
      ["Washington", "Flat rentals"],
      ["Keswick", "Cabin rentals"],
      ["London", "Holiday rentals"],
      ["Scarborough", "Holiday rentals"],
      ["Sherwood Forest", "Cottage rentals"],
      ["York", "Cabin rentals"],
      ["Paris", "Apartment rentals"],
      ["Rhodes", "Cottage rentals"],
      ["Nashville", "Holiday rentals"],
      ["Dublin", "Cottage rentals"],
      ["Florence", "Villa rentals"]
  ];

  // Add Arts & Culture places to list
  artsCulturePlaces.forEach(function(place) {
      var pair = document.createElement('div');
      pair.classList.add('list-pair');
      pair.innerHTML = `<div>${place[0]}</div><div>${place[1]}</div>`;

      artsCultureList.appendChild(pair);
  });
}

// Add Arts & Culture list on page load
addArtsCultureList();
// Function to add Outdoors list dynamically
function addOutdoorsList() {
  var outdoorsList = document.getElementById('outdoorsListSection');
  outdoorsList.innerHTML = ''; // Clear previous content

  // List of Outdoors places
  var outdoorsPlaces = [
      ["Lake Martin", "Lakehouse rentals"],
      ["Banff", "House rentals"],
      ["Nerja", "Flat rentals"],
      ["Greer", "Cabin rentals"],
      ["Lake Havasu City", "House rentals"],
      ["Lake Powell", "Holiday rentals"],
      ["North Rim", "Holiday rentals"],
      ["Payson", "Holiday rentals"],
      ["Pinetop-Lakeside", "Holiday rentals"],
      ["Red Rock", "Holiday rentals"],
      ["Dinner Plain", "Pet-friendly rentals"],
      ["Streaky Bay", "Holiday rentals"],
      ["Emerald Lake", "Cabin rentals"],
      ["Vancouver Island", "Apartment rentals"],
      ["Victoria", "Beach house rentals"],
      ["Idyllwild-Pine Cove", "House rentals"],
      ["Mammoth Lakes", "Holiday rentals"],
      ["Palm Desert", "Villa rentals"]
  ];

  // Add Outdoors places to list
  outdoorsPlaces.forEach(function(place) {
      var pair = document.createElement('div');
      pair.classList.add('list-pair');
      pair.innerHTML = `<div>${place[0]}</div><div>${place[1]}</div>`;

      outdoorsList.appendChild(pair);
  });
}

// Add Outdoors list on page load
addOutdoorsList();

// Function to add Mountains list dynamically
function addMountainsList() {
  var mountainsList = document.getElementById('mountainsListSection');
  mountainsList.innerHTML = ''; // Clear previous content

  // List of Mountains places
  var mountainsPlaces = [
      ["Mentone", "Holiday rentals"],
      ["Sedona", "Apartment rentals"],
      ["Helen", "Cabin rentals"],
      ["Pine Mountain", "Holiday rentals"],
      ["Stone Mountain", "Holiday rentals"],
      ["Island Park", "Holiday rentals"],
      ["Blue Mountains", "Chalet rentals"],
      ["Asheville", "Rentals with pools"],
      ["Blowing Rock", "Cabin rentals"],
      ["Boone", "Holiday rentals"],
      ["Hochatown", "Holiday rentals"],
      ["Pigeon Forge", "Holiday rentals"],
      ["Townsend", "Holiday rentals"],
      ["Wears Valley", "Holiday rentals"],
      ["Cabins", "Holiday rentals"]
  ];

  // Add Mountains places to list
  mountainsPlaces.forEach(function(place) {
      var pair = document.createElement('div');
      pair.classList.add('list-pair');
      pair.innerHTML = `<div>${place[0]}</div><div>${place[1]}</div>`;

      mountainsList.appendChild(pair);
  });
}

// Add Mountains list on page load
addMountainsList();

// Function to add Beach list dynamically
function addBeachList() {
  var beachList = document.getElementById('beachListSection');
  beachList.innerHTML = ''; // Clear previous content

  // List of Beach places
  var beachPlaces = [
      ["Dauphin Island", "Pet-friendly rentals"],
      ["Fort Morgan", "Holiday rentals"],
      ["Gulf Shores", "Holiday rentals"],
      ["Bruny Island", "Holiday rentals"],
      ["Crescent Head", "Holiday rentals"],
      ["Gerringong", "Holiday rentals"],
      ["Hamilton Island", "Holiday rentals"],
      ["Lancelin", "Holiday rentals"],
      ["Melbourne Beach", "Beach house rentals"],
      ["Moonta Bay", "Holiday rentals"],
      ["Ocean Grove", "Cottage rentals"],
      ["Majorca", "Bungalow rentals"],
      ["Big Sur", "House rentals"],
      ["Bodega Bay", "Holiday rentals"],
      ["Cambria", "House rentals"],
      ["Cayucos", "Holiday rentals"],
      ["Huntington Beach", "House rentals"],
      ["La Jolla Shores Beach", "Holiday rentals"]
  ];

  // Add Beach places to list
  beachPlaces.forEach(function(place) {
      var pair = document.createElement('div');
      pair.classList.add('list-pair');
      pair.innerHTML = '<div>' + place[0] + '</div><div>' + place[1] + '</div>';
      beachList.appendChild(pair);
  });
}

// Call addBeachList function on page load
addBeachList();

// Function to add Unique Stays list dynamically
function addUniqueStaysList() {
  var uniqueStaysList = document.getElementById('uniqueStaysListSection');
  uniqueStaysList.innerHTML = ''; // Clear previous content

  // List of Unique Stays
  var uniqueStays = [
      ["Yurt Rentals", "United States"],
      ["Yurt Rentals", "United Kingdom"],
      ["Castle Rentals", "United States"],
      ["Houseboats", "United States"],
      ["Holiday Caravans", "United Kingdom"],
      ["Private Island Rentals", "United States"],
      ["Farm Houses", "United States"],
      ["Farm Cottages", "United Kingdom"],
      ["Cabin Rentals", "Australia"],
      ["Luxury Cabins", "United Kingdom"],
      ["Luxury Cabins", "United States"],
      ["Holiday Chalets", "United Kingdom"],
      ["Cottage Rentals", "United States"],
      ["Holiday Cottages", "United Kingdom"],
      ["Mansion Rentals", "United States"],
      ["Villa Rentals", "United Kingdom"],
      ["Holiday Bungalows", "United Kingdom"],
      ["Bungalow Rentals", "United States"]
  ];

  // Add Unique Stays to list
  uniqueStays.forEach(function(stay) {
      var pair = document.createElement('div');
      pair.classList.add('list-pair');
      pair.innerHTML = '<div>' + stay[0] + '</div><div>' + stay[1] + '</div>';
      uniqueStaysList.appendChild(pair);
  });
}

// Call addUniqueStaysList function on page load
addUniqueStaysList();

// Function to add Things to do list dynamically
function addThingsToDoList() {
  var thingsToDoList = document.getElementById('thingsToDoListSection');
  thingsToDoList.innerHTML = ''; // Clear previous content

  // List of Things to do
  var thingsToDo = [
      ["London", "England"],
      ["Paris", "Île-de-France"],
      ["New York", "New York"],
      ["Barcelona", "Catalonia"],
      ["İstanbul", "İstanbul"],
      ["Bali", "Indonesia"],
      ["Amsterdam", "North Holland"],
      ["Miami", "Florida"],
      ["Madrid", "Community of Madrid"],
      ["Los Angeles", "California"],
      ["Rome", "Lazio"],
      ["Lisbon", "Lisbon"],
      ["Tokyo", "Tokyo"],
      ["Vienna", "Vienna"],
      ["Athens", "Greece"],
      ["Prague", "Czechia"],
      ["Orlando", "Florida"],
      ["Cancún", "Quintana Roo"]
  ];

  // Add Things to do to list
  thingsToDo.forEach(function(activity) {
      var pair = document.createElement('div');
      pair.classList.add('list-pair');
      pair.innerHTML = '<div>' + activity[0] + '</div><div>' + activity[1] + '</div>';
      thingsToDoList.appendChild(pair);
  });
}

// Call addThingsToDoList function on page load
addThingsToDoList();

// Function to add Categories list dynamically
function addCategoriesList() {
  var categoriesList = document.getElementById('categoriesListSection');
  categoriesList.innerHTML = ''; // Clear previous content

  // List of Categories
  var categories = [
      "Amazing pools", "Arctic", "Camping", "Camper vans",
      "Castles", "Containers", "Countryside", "Design",
      "Earth homes", "Farms", "National parks", "Vineyards",
      "OMG!", "Tiny homes", "Towers", "Windmills", "Luxe"
  ];

  // Add Categories to list
  categories.forEach(function(category) {
      var pair = document.createElement('div');
      pair.classList.add('list-pair');
      pair.innerHTML = '<div>' + category + '</div>';
      categoriesList.appendChild(pair);
  });
}

// Call addCategoriesList function on page load
addCategoriesList();




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

  next.id="next-page";
  previous.id="previous-page";

  middle_page.id = "mid-page";
  first_page.id = "first-page";
  last_page.id = "last-page";
  prev_page.id = "prev-page";
  next_page.id = "next-page";
  rest_page.className = "rest-page";
  rest_page1.className = "rest-page1";
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

// top carousel button 
let topNextButton = document.getElementById("top-carousel-next");
let topPrevButton = document.getElementById("top-carousel-prev");
let topCarousel = document.getElementById("iconss");
topNextButton.addEventListener("click",()=>{
  topCarousel.scrollLeft+=1000;
})
topPrevButton.addEventListener("click",()=>{
  topCarousel.scrollLeft-=1000;
})


let userName = document.getElementById("userName");
let signupLink = document.getElementById("singupLink");
let loginLink = document.getElementById("loginLink");
let wishlistLink = document.getElementById("wishlistLink");
let logoutLink = document.getElementById("logoutLink");
let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
let userIcon = document.getElementById("userIcon");

if(loggedIn){
  userIcon.innerText = loggedIn.name[0];
  console.log(userIcon.innerText);
  userIcon.classList.remove("material-icon");
  userIcon.style.borderRadius = "50%"
  userIcon.style.backgroundColor = "black"
  userIcon.style.color = "white"
  userIcon.style.padding = "0 10px 10px 10px";
  userName.innerText = loggedIn.name;
  signupLink.style.display = "none";
  loginLink.style.display = "none" ;
}
else{
  userName.style.display = "none";
  wishlistLink.style.display = "none";
  logoutLink.style.display = "none";
}
logoutLink.addEventListener("click", ()=>{
  localStorage.removeItem("loggedIn");
})
fetchData(currPage,baseURL)

