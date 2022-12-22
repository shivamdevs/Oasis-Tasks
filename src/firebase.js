import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
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
    apiKey: "AIzaSyDRA5z3oE6WR5yh9XwdS2_GcIAo6WTD-UI",
    authDomain: "react-c4e3a.firebaseapp.com",
    projectId: "react-c4e3a",
    storageBucket: "react-c4e3a.appspot.com",
    messagingSenderId: "361633102410",
    appId: "1:361633102410:web:f533b9337899da7398c4b3",
    measurementId: "G-D49LGDJTFD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
                profile: user.photoURL,
            });
        }
    } catch (err) {
        return err;
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        return err;
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            profile: "",
        });
    } catch (err) {
        return err;
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (err) {
        return err;
    }
};

const logout = () => {
    signOut(auth);
};

const getUserData = async (user) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        if (!doc.docs.length) return null;
        const data = doc.docs[0].data();
        if (!data.profile) data.profile = `https://ui-avatars.com/api/?name=${encodeURI(data.name)}&background=2a52be&color=ffffff`;
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getWorkspaces = async (user) => {
    try {
        const q = query(collection(db, "workspace"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = [];
        for (let item of doc.docs) {
            data.push({
                ...item.data(),
                wsid: item.id,
            });
        }
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const createWorkspace = async (user, name) => {
    try {
        const q = query(collection(db, "workspace"), where("uid", "==", user?.uid), where("name", "==", name));
        const doc = await getDocs(q);
        if (doc.docs.length) return { error: "This workspace is already yours." };
        const wsp = await addDoc(collection(db, "workspace"), {
            uid: user.uid,
            name,
        });
        // const q2 = query(collection(db, "workspace"), where("uid", "==", user?.uid));
        // const lock = await getDocs(q2);
        // console.log(lock);
        // for (let item of lock.docs) {
        //     if (item.id === wsp.id) {
        //         await updateDoc(collection(db, "workspace", item.id), {wsid: wsp.id});
        //     } else {
        //         await updateDoc(collection(db, "workspace", item.id), {active: true});
        //     }
        // }
        return wsp.id;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export {
    auth,
    db,
    getUserData,
    getWorkspaces,
    createWorkspace,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};