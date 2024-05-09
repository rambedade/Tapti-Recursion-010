let userEmail = document.getElementById("user_email");
let userPassword = document.getElementById("user_password");
let submitLogin = document.getElementById("submit-login");
let userURL = "https://tapti-recursion-010-v93f.onrender.com/users";

submitLogin.addEventListener("click", verifyUserData);

async function verifyUserData(){
    if(userEmail.value && userPassword.value){
        try{
            let res = await fetch(userURL);
            let data = await res.json();
            let flag = false;
            data.forEach(element => {
                if(element.email == userEmail.value && element.password == userPassword.value){
                    alert(`Welcome ${element.name}!`);
                    localStorage.setItem("loggedIn",element.name);

                }
                else{
                    alert("Email or Password is Invalid");
                }
            });
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        alert("Please enter all the field first!");
    }
}

// verifyUserData()