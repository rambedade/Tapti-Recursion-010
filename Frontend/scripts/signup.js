let  userName = document.getElementById("user_name");
let userEmail = document.getElementById("user_email");
let userPassword = document.getElementById("user_password");
let userPasswordConfirm = document.getElementById("confirm-password")
let submitSignup = document.getElementById("submit-signup");
let terms = document.getElementById("terms");
let loading = document.getElementById("loading");
let userURL = "https://tapti-recursion-010-v93f.onrender.com/users";
console.log("SCript");
let form = document.getElementById("signup-form")

form.addEventListener("submit", (e)=>{e.preventDefault});
submitSignup.addEventListener("click", sendUserData)


async function verifyUserData(){
    if(userEmail.value && userPassword.value){
        try{
            let res = await fetch(userURL);
            let data = await res.json();
            for(let element of data){
                if(element.email == userEmail.value && element.password == userPassword.value){
                    return true
                }
                
            };
        }
        catch(err){
            console.log(err);
        }
    }
    return false;
    
}

function showLoading(){
    let img = document.createElement("img");
    img.src = "assets/ZKZg.gif"
    loading.append(img);
}
function stopLoading(){
    loading.innerHTML = "";
}
async function sendUserData(){
    if(userName.value && userEmail.value && userPassword.value && userPasswordConfirm.value && terms.checked){
        
        showLoading()
        if(userPassword.value.length < 5) alert("Password must contain at least 6 characters")
        else if(userPasswordConfirm.value != userPassword.value) alert("Password didn't match");
        else if(await verifyUserData()) alert(`User Email is already registered!`);
        else{
            
            let newObj = {"name": userName.value,
                    "email":userEmail.value,
                    "password":userPassword.value,
            };
            try{
                await fetch(userURL,{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newObj),
                });
                stopLoading();
                alert("Registered Successful");
                window.location.assign("login.html");

            }
            catch(err){
                console.log(err);
            }
        }
    }
    else{
        alert("Fill all the fields")
    }
    stopLoading();

    
}
