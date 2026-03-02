import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
import { getAuth , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

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
    showMessage("Creating Account.....")


    
        const email = regEmail.value.trim()
        const password = regPass.value.trim()
    
        await createUserWithEmailAndPassword(auth,email,password)
        showMessage("Account created")
        registerForm.reset()
  
        showMessage(err?.message || "Register error",true)
   
})