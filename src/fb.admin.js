import { clarifyError, db } from "./fb.user";
import { collection, getDocs, limit, query, where } from "firebase/firestore/lite";

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