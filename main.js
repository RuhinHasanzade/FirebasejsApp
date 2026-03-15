import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCmbOOJoK1AxtmcjatWuWg-unpksy3xoFA",
  authDomain: "testlogin-5508f.firebaseapp.com",
  projectId: "testlogin-5508f",
  storageBucket: "testlogin-5508f.firebasestorage.app",
  messagingSenderId: "75516359443",
  appId: "1:75516359443:web:1a1bc013ed7d31e92e20e6",
  measurementId: "G-H2ZHR0LZCP"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const msg = document.getElementById("msg");

const tabLogin = document.getElementById("tabLogin")
const tabRegister = document.getElementById("tabRegister")

const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")
const profile = document.getElementById("profile")
const userEmail = document.getElementById("userEmail")
const logoutBtn = document.getElementById("logoutBtn")

const loginEmail = document.getElementById("loginEmail")
const loginPass = document.getElementById("loginPass")

const regUsername = document.getElementById("regUsername")
const regEmail = document.getElementById("regEmail")
const regPass = document.getElementById("regPass")
const regConfirmPass = document.getElementById("regConfirmPass")


function showMessage(text = "" , isError = false) {
    msg.textContent = text;
    msg.style.color = isError ? "#d31b1b" :  "#1cd15e "
}



function showTab(which) {
    const isLogin = which === "login"
    tabLogin.classList.toggle("active",isLogin)
    tabRegister.classList.toggle("active",!isLogin)

    loginForm.classList.toggle("hidden",!isLogin)
    registerForm.classList.toggle("hidden",isLogin)

    showMessage()

}

tabLogin.addEventListener("click",() =>showTab("login"))
tabRegister.addEventListener("click",() =>showTab("register"))

registerForm.addEventListener("submit" , async (e)=>{
    e.preventDefault();

    const username = regUsername.value.trim();
    const email = regEmail.value.trim();
    const password = regPass.value.trim();
    const confirmPassword  = regConfirmPass.value.trim();

    const check = validatePassword(password)
    
    if(check!= "OK") {
        showMessage(check , true)
        return
    }


    if(!username){
        showMessage("Istifadechi bos ola bilmez" , true)
        return
    }
    
    if(password !== confirmPassword) {
        showMessage("Sifreler eyni deyl",true)
        return
    }
    
    try {
        showMessage("Creating Account.....")
        const userCredential = await createUserWithEmailAndPassword(auth,email,password)

        await updateProfile(userCredential.user ,{
            displayName : username
        })
        showMessage("Account created")
        registerForm.reset()

        window.location = "home-page.html"
        console.log(userCredential);
        
    } catch (err) {
        showMessage(err?.message || "Register error",true)
    }
   
})


loginForm.addEventListener("submit",async (e) => {
    e.preventDefault();
    const email = loginEmail.value.trim()
    const password = loginPass.value.trim()

    console.log(email);
    console.log(password);
    
    
    try{
        showMessage("Logging in ....")
        var result  = await signInWithEmailAndPassword(auth , email ,password)
        console.log(result);
        showMessage("Login Successful")
        
        loginForm.reset()
        if(result!=null){
            window.location = "home-page.html"
        }

    }catch(err) {
        showMessage(err?.message || "Login  error" , true)
    }
})

onAuthStateChanged(auth , (user) => {
    console.log("Current user: " ,user);
    
})

function validatePassword(password) {
    const minLength = /.{6,}/
    const hasUpper = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSymbol =  /[!@#$%^&*(),.?":{}|<>]/

    if(!minLength.test(password)) {
        return "Parol minimum 6 simvol olamldiir"
    }

    if(!hasUpper.test(password)) {
        return "Parolda en az 1 boyuk herf olmalidir"
    }

    if(!hasNumber.test(password)) {
        return "Parolda en az 1 reqem olmalidir"
    }

    if(!hasSymbol.test(password)) {
        return "Parolda en az 1 simvol olmalidir"
    }

    return "OK"


}