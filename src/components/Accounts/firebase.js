import { initializeApp } from "firebase/app";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    FacebookAuthProvider,
    updateProfile,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAuT7owM2lF6JqmWUionKIM1vQ2pOHgzRM",
    authDomain: "my-oasis-tech.firebaseapp.com",
    projectId: "my-oasis-tech",
    storageBucket: "my-oasis-tech.appspot.com",
    messagingSenderId: "180046491267",
    appId: "1:180046491267:web:f184a60c760b8c0eb375b6",
    measurementId: "G-WJZGXF8F3L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function formatAuth(err) {
    const result = { type: "error", for: "", message: "" };
    const error = String(err);
    console.log(error);
    if (error.includes('auth/popup-closed-by-user')) {
        return (result.for = "popup") && (result.message = "Popup was closed by user, try again") && result;
    } else if (error.includes('auth/email-already-in-use')) {
        return (result.for = "email") && (result.message = "This email is already registered") && result;
    } else if (error.includes('auth/weak-password')) {
        return (result.for = "password") && (result.message = "This password is too weak") && result;
    } else if (error.includes('auth/user-not-found')) {
        return (result.for = "email") && (result.message = "This email address does not exists") && result;
    } else if (error.includes('auth/wrong-password')) {
        return (result.for = "password") && (result.message = "This password is incorrect") && result;
    } else if (error.includes('')) {
        return (result.for = "") && (result.message = "") && result;
    } else if (error.includes('')) {
        return (result.for = "") && (result.message = "") && result;
    } else if (error.includes('')) {
        return (result.for = "") && (result.message = "") && result;
    }
    return result;
}


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                profile: user.photoURL || "https://cdn.jsdelivr.net/gh/shivamdevs/Oasis-Assets@master/Images/Accounts/user-no-image.svg",
            });
        }
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};

const facebookProvider = new FacebookAuthProvider();
const signInWithFacebook = async () => {
    try {
        const res = await signInWithPopup(auth, facebookProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "facebook",
                email: user.email,
                profile: user.photoURL || "https://cdn.jsdelivr.net/gh/shivamdevs/Oasis-Assets@master/Images/Accounts/user-no-image.svg",
            });
        }
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};

const signInWithEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};

const registerWithEmail = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await updateProfile(user, { displayName: name });
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            profile: "https://cdn.jsdelivr.net/gh/shivamdevs/Oasis-Assets@master/Images/Accounts/user-no-image.svg",
        });
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    registerWithEmail,
    sendPasswordReset,
    logout,
};