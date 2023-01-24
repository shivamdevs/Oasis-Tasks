import { clarifyError, db } from "./fb.user";
import { collection, deleteDoc, getDocs, limit, query, where } from "firebase/firestore/lite";

export async function isUserWithAdminRights (user) {
    try {
        const q = query(collection(db, 'admins'), where("uid", "==", user.uid), limit(1));
        const snap = await getDocs(q);
        let result = null;
        snap.docs.forEach(item => {
            result = { ...item.data(), id: item.id };
        });
        if (!result) {
            return {
                type: "error",
                action: "is-admin",
                data: null
            };
        }
        return {
            type: "success",
            action: "is-admin",
            data: result
        };
    } catch (err) {
        console.error(err);
        return clarifyError(err);
    }
}

export async function deleteAllDeleted(progress = null) {
    try {
        const listsq = query(collection(db, 'tasks-list'));
        const listsr = await getDocs(listsq);
        const listing = [];
        for (const list of listsr.docs) {
            progress(`Checking list ${list.id}`);
            if (list.data().deleted) {
                progress(`Deleting list ${list.id}`);
                await deleteDoc(list.ref);
            } else {
                listing.push(list.id);
            }
        }
        const tasksq = query(collection(db, 'tasks-todo'));
        const tasksr = await getDocs(tasksq);
        for (const task of tasksr.docs) {
            progress(`Deleting task ${task.id}`);
            listing.push(task.id);
            if (task.data().deleted || !listing.includes(task.data().list)) {
                progress(`Deleting task ${task.id}`);
                await deleteDoc(task.ref);
            }
        }
        return { type: "success" };
    } catch (err) {
        console.error(err);
        return clarifyError(err);
    }
}