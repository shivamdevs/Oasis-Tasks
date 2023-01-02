import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { randomString } from "./app.functions";
import { clarifyError, db } from "./fb.user";

async function addNewList(user, label) {
    const created = (() => {
        const date = new Date();
        return date.setTime(date.getTime());
    })();
    try {
        const data = await setDoc(doc(db, 'to-do-lists', `${user.uid}-${created}-${randomString(11)}`), {
            uid: user.uid,
            label,
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

async function updateList(list, field, value) {
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
        await updateDoc(doc(db, 'to-do-lists', list), getFieldValues());
        return {
            type: "success",
            action: "update-list",
            data: ""
        }
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

async function updateTask(task, updates = {}) {
    const timestamp = (() => {
        const date = new Date();
        return date.setTime(date.getTime());
    })();
    try {
        updates.updated = timestamp;
        await updateDoc(doc(db, 'to-do-tasks', task), updates);
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
                label: <i className="fas fa-star"></i>,
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
        const result = {
            "$allTasks": {},
        };
        for (const key of docs) (result[key.key] = []) && (result[key.key].completed = []);
        snap.docs.reverse().forEach(item => {
            const data = { ...item.data(), id: item.id };
            if (data.starred) (data.checked ? result.starred.completed.push(data) : result.starred.push(data));
            if (data.checked) result[data.list].completed.push(data); else result[data.list].push(data);
            result.$allTasks[item.id] = data;
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

async function deleteAllDeleted() {
    try {
        const listsq = query(collection(db, 'to-do-tasks'), where("deleted", "==", true));
        const listsr = await getDocs(listsq);
        listsr.docs.forEach(async list => {
            console.log("Deleting list", list.id);
            await deleteDoc(list.ref);
        });
        const tasksq = query(collection(db, 'to-do-tasks'), where("deleted", "==", true));
        const tasksr = await getDocs(tasksq);
        tasksr.docs.forEach(async task => {
            console.log("Deleting task", task.id);
            await deleteDoc(task.ref);
        });
    } catch (err) {
        console.error(err);
        return clarifyError(err);
    }
}

export {
    addNewList,
    addNewTask,
    updateList,
    updateTask,
    getAllLists,
    getAllTasks,
    deleteAllDeleted,
};