import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile ,onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore , collection , onSnapshot , serverTimestamp , query , addDoc , orderBy} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


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
const db = getFirestore(app)

const username = document.getElementById("username");
const logout = document.getElementById("logout");
const postInp = document.getElementById("postInput")
const sharePost = document.getElementById("sharePost")
const postsDiv = document.getElementById("posts")



logout.addEventListener("click",async () => {
    await signOut(auth)
    window.location = "index.html"
})

function renderPosts(docs) {
    postsDiv.innerHTML = "";

    if(!docs.length) {
        postsDiv.innerHTML = `<p class="empty">Hele post yoxdur .....</p>`
        return
    }

    docs.forEach((docItem) => {
        const post = docItem.data()

        const div = document.createElement("div");
        div.className = "post"

        div.innerHTML = `
            <div class = "post-header">
                <div class = "post-user">${post.userName || "User"}</div>
                <div class = "post-date">${post.createdAt}</div>                
            </div>
            <div class = "post-text">${post.text}</div>
        `
        postsDiv.appendChild(div)

    });
}

onAuthStateChanged(auth,(user) => {
    if(user) {
        username.textContent = user.displayName || user.email || "User"

        const postsRef = collection(db,"posts")
        const q = query(postsRef , orderBy("createdAt","desc"))

        onSnapshot(q,(snapshot)=> {
            renderPosts(snapshot.docs)
        } , (error) => {
            console.error("Postlari cekerken xeta: " , error)
            postsDiv.innerHTML = `<p class="empty">Postlar yuklenmedi</p>`
        })
    } else {
        window.location = "index.html"
    }
})

sharePost.addEventListener("click", async () => {
    const user = auth.currentUser;
    const text = postInp.value.trim()
    if(!user) {
        alert("Istifadechi tapilmadi")
        return
    }

    if(!text) {
        alert("Bos post paylasmaq olmaz")
        return;
    }

    sharePost.disabled = true
    sharePost.textContent = "Gonderilir..."

    try{
        await addDoc(collection(db,"posts") ,{
            userId : user.uid,
            userName: user.displayName || user.email || "User",
            text : text,
            createdAt : serverTimestamp()
        })

        postInp.value= ""
    }catch(error) {
        console.error("Post elave edilerken xeta: " ,  error)
        alert("Postu paylasmaq alinmadi")
    } finally {
        sharePost.disabled = false
        sharePost.textContent = "Paylaş"
    }
})