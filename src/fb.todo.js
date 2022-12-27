import { addDoc, collection, getDocs, query, where } from "firebase/firestore/lite";
import { clarifyError, db } from "./fb.user";

async function addNewList(user, label) {
    const created = (() => {
        const date = new Date();
        return date.setTime(date.getTime());
    })();
    try {
        const data = await addDoc(collection(db, 'to-do-lists'), {
            uid: user.uid,
            label,
            deleted: false,
            created,
        });
        return {
            type: "success",
            action: "add-list",
            data: data
        };
    } catch (err) {
        return clarifyError(err);
    }
}

async function getAllLists(user) {
    try {
        const q = query(collection(db, 'to-do-lists'), where('uid', "==" , user.uid), where('deleted', "==", false));
        const snap = await getDocs(q);
        const result = [
            {
                label: '*star*',
                key: "starred",
            },
            {
                label: "My tasks",
                key: "default",
            }
        ];
        snap.forEach(item => result.push({label: item.data().label, key: item.id}));
        return {
            type: "success",
            action: "get-lists",
            data: result
        };
    } catch (err) {
        return clarifyError(err);
    }
}

export {
    addNewList,
    getAllLists,
};