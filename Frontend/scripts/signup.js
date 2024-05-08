let  userName = document.getElementById("user_name");
let userEmail = document.getElementById("user_email");
let userPassword = document.getElementById("user_password");
let submitSignup = document.getElementById("submit-signup");
let userURL = "https://tapti-recursion-010-v93f.onrender.com/users";
console.log("SCript");
submitSignup.addEventListener("click", sendUserData)
async function sendUserData(){

    let newObj = {"name": userName.value,
                    "email":email.value,
                    "password":userPassword.value,
    };
    // let dummyObj = {"name": "admin",
    //                 "email":"admin@gmail.com",
    //                 "password":"admin@123",
    // };
    try{

        await fetch(userURL,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dummyObj),
        });
        alert("Login Successful")
    }
    catch(err){
        console.log(err);
    }
}

// sendUserData();