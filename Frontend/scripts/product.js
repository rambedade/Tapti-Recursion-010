let productID = localStorage.getItem("currCard");
let baseURL = "https://tapti-recursion-010-v93f.onrender.com/data";

console.log("script");
async function getData(){
    try{
        let res = await fetch(baseURL);
        let data = await res.json();
        for(let elem of data){
            if(elem.id == productID){
                // console.log(elem);
                createdPage(elem);
                break;
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

getData();

function createdPage(obj){
    let flatTitle = document.getElementById("flat-title");
    let flatImages = document.getElementById("flat-images");
    let flatDetails = document.getElementById("flat-details");
    let host = document.getElementById("host");
    let description = document.getElementById("disc-sect");
    let flatPrice = document.getElementById("flat-price");
    
    // flat name 
    flatTitle.innerText = obj.name;

    // flat images 
    let img1 = document.createElement("img");
    let img2 = document.createElement("img");
    let img3 = document.createElement("img");
    let img4 = document.createElement("img");
    let img5 = document.createElement("img");
    img1.src = obj.images[0];
    img2.src = obj.images[1];
    img3.src = obj.images[2];
    img4.src = obj.images[3];
    img5.src = obj.images[4];
    flatImages.append(img1,img2, img3, img4, img5);

    // flat location and review section 
    let smartLocation = document.createElement("h3");
    let smallInfo = document.createElement("div");
    smallInfo.innerHTML = `<span>${obj.bedroom} bedroom </span>`;
    if(obj.bathrooms >0 ) smallInfo.innerHTML += '<ul><li> Private attached bathroom<li></ul>'
    let ratings = document.createElement("div");
    ratings.innerHTML = `<i class="fa-solid fa-star"></i> ${(obj.review_scores_rating*5*0.01).toFixed(1)} <span> ${obj.number_of_reviews} reviews </span>`
    smartLocation.innerText = obj.smart_location;
    flatDetails.append(smartLocation, smallInfo, ratings);
    
    // Host section code 
    let hostImg = document.createElement("img");
    hostImg.src = obj.host_picture_url;
    let hostDetails = document.createElement("div");
    let hostName = document.createElement("h3");
    hostName.innerText = `Hosted by ${obj.host_name}`;
    let timeHosting = document.createElement("p");
    timeHosting.innerText = "8 years of hosting"
    hostDetails.append(hostName,timeHosting);
    host.append(hostImg, hostDetails);

    // description section
    description.innerText = obj.description;

    // price section 
    flatPrice.innerHTML = `<span>$ ${obj.price}</span> <sup>night</sup>`
    
}


async function fetchIndexHTMl(){
    let res = await fetch("index.html");
    let data = await res.text();
    let indexHTML = new DOMParser().parseFromString(data, 'text/html');
    let navBar = indexHTML.getElementById("navbar");
    let footer = indexHTML.getElementById("footer");
    let productNavbar = document.getElementById("navbar");
    let productFooter = document.getElementById("footer");
    productNavbar.innerHTML = navBar.innerHTML;
    productFooter.innerHTML = footer.innerHTML;
    // console.log("Index",navBar.innerHTML);
}

fetchIndexHTMl();