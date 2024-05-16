
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";

import { 
    addDoc,
     collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAodlZI8G2aN3AikqapY7mcBHGYbG7ysI4",
  authDomain: "netflix-59ffe.firebaseapp.com",
  projectId: "netflix-59ffe",
  storageBucket: "netflix-59ffe.appspot.com",
  messagingSenderId: "272538802868",
  appId: "1:272538802868:web:211ebf233c5c7114dd95e1"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, user), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}



const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
        
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }

}

const logout = ()=>{
    signOut(auth)
}

export{auth, db, login, signup, logout}