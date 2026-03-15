import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile ,onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


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


const username = document.getElementById("username");
const logout = document.getElementById("logout");

onAuthStateChanged(auth,(user) => {
    if(user) {
        username.textContent = user.displayName || user.email || "User"
    } else {
        window.location = "index.html"
    }
})

logout.addEventListener("click",async () => {
    await signOut(auth)
    window.location = "index.html"
})