let userEmail = document.getElementById("user_email");
let userPassword = document.getElementById("user_password");
let submitLogin = document.getElementById("submit-login");
let form = document.getElementById("login-form");
let loading = document.getElementById("loading");

let userURL = "https://tapti-recursion-010-v93f.onrender.com/users";
form .addEventListener("submit", (e)=>{e.preventDefault();})


function showLoading(){
    let img = document.createElement("img");
    img.src = "assets/ZKZg.gif"
    loading.append(img);
}

function stopLoading(){
    loading.innerHTML = "";
}

submitLogin.addEventListener("click", (e)=>{
    verifyUserData();
});

async function verifyUserData(){
    if(userEmail.value && userPassword.value){
        showLoading();
        try{
            let res = await fetch(userURL);
            let data = await res.json();
            let flag = false;
            for(let element of data){
                if(element.email == userEmail.value && element.password == userPassword.value){
                    stopLoading();
                    alert(`Welcome ${element.name}!`);
                    localStorage.setItem("loggedIn",JSON.stringify(element));
                    flag = true;
                    window.location.assign("index.html");
                    // head.appendChild(redirect);
                    break;
                }
                
            };
            if(!flag) alert("Email or Password is Invalid");
            // console.log(data);
        }
        catch(err){
            console.log(err);
        }
        stopLoading();
    }
    else{
        alert("Please enter all the field first!");
    }
}

// verifyUserData()