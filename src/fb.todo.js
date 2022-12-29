import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
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
        console.error(err);
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
        console.error(err);
        return clarifyError(err);
    }
}

async function updateTask(task, field, value) {
    const timestamp = (() => {
        const date = new Date();
        return date.setTime(date.getTime());
    })();
    const getFieldValues = () => {
        const obj = {
            updated: timestamp,
        };
        obj[field] = value;
        return obj;
    };
    try {
        await updateDoc(doc(db, 'to-do-tasks', task), getFieldValues());
        return {
            type: "success",
            action: "update-task",
            data: ""
        }
    } catch (err) {
        console.error(err);
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
                label: 'My tasks',
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
        console.error(err);
        return clarifyError(err);
    }
}

async function getAllTasks(user, docs) {
    try {
        const q = query(collection(db, 'to-do-tasks'), where("uid" , "==", user.uid), where("deleted", "==", false));
        const snap = await getDocs(q);
        const result = {};
        for (const key of docs) (result[key.key] = []) && (result[key.key].completed = []);
        snap.docs.reverse().forEach(item => {
            const data = { ...item.data(), id: item.id };
            if (data.starred) result.starred.push(data);
            if (data.checked) result[data.list].completed.push(data); else result[data.list].push(data);
        });
        return {
            type: "success",
            action: "get-lists",
            data: result
        };
    } catch (err) {
        console.error(err);
        return clarifyError(err);
    }
}

export {
    addNewList,
    addNewTask,
    updateTask,
    getAllLists,
    getAllTasks,
};