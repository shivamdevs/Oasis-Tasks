import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import { randomString } from "./appdata";
import { clarifyError, db } from "./fb.user";

async function addNewList(user, label, {defaultList = false}) {
    const created = (() => {
        const date = new Date();
        return date.setTime(date.getTime());
    })();
    try {
        const data = await setDoc(doc(db, 'to-do-lists', (defaultList ? 'default' : (`${user.uid}-${created}-${randomString(11)}`))), {
            uid: user.uid,
            label,
            deleted: false,
            created,
            updated: created,
            defaultList: defaultList,
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

async function addNewTask(user, list, task, detail) {
    const created = (() => {
        const date = new Date();
        return date.setTime(date.getTime());
    })();
    try {
        const data = await setDoc(doc(db, 'to-do-tasks', (`${user.uid}-${created}-${randomString(11)}`)), {
            uid: user.uid,
            list,
            task,
            detail,
            starred: false,
            deleted: false,
            created,
            updated: created,
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

// async function updateTask(user, task, field, value) {
//     const timestamp = (() => {
//         const date = new Date();
//         return date.setTime(date.getTime());
//     })();
// }

async function getAllLists(user) {
    try {
        const q = query(collection(db, 'to-do-lists'), where('uid', "==" , user.uid), where('deleted', "==", false));
        const snap = await getDocs(q);
        const result = [
            {
                label: '*star*',
                key: "starred",
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

async function getAllTasks(user, docs) {
    try {
        const q = query(collection(db, 'to-do-tasks'), where("uid" , "==", user.uid), where("deleted", "==", false));
        const snap = await getDocs(q);
        const result = {};
        for (const key of docs) result[key.key] = [];
        snap.docs.reverse().forEach(item => {
            const data = item.data();
            if (data.starred) result.starred.push({...data, id: item.id});
            result[data.list].push({...data, id: item.id});
        });
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
    addNewTask,
    getAllLists,
    getAllTasks,
};