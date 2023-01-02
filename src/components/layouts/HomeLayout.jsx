import app from "../../app.data";
import { auth } from "../../fb.user";
import { LoadCircle } from "./Loading";
import NewList from "../pages/lists/NewList";
import NewTask from "../pages/lists/NewTask";
import Listing from "../pages/lists/Listing";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAllLists, getAllTasks } from "../../fb.todo";
import { useCallback, useEffect, useState } from "react";
import ProfileMenu from "../pages/lists/settings/Profile";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { isUserWithAdminRights } from "../../fb.admin";


function HomeLayout() {
    return (
        <>
            <Routes>
                <Route path="/:listid/*" element={<Home />} />
                <Route path="/" element={<RedirectToList />} />
            </Routes>
        </>
    );
};

export default HomeLayout;

function RedirectToList() {
    const navigate = useNavigate();
    let bucket = "default";
    if (window.localStorage) {
        bucket = window.localStorage.getItem(`${app.bucket}.current.bucket`);
        if (bucket === null) {
            bucket = "default";
            window.localStorage.setItem(`${app.bucket}.current.bucket`, bucket);
        }
    }
    useEffect(() => {navigate(`/lists/${bucket}`, { replace: true })});
}

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [userLoading, setUserLoading] = useState(0);

    const [admin, setAdmin] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    const [categories, setCategory] = useState([]);
    const [taskArray, setTaskArray] = useState({});
    const [currentList, setCurrentList] = useState({});

    const updateLists = useCallback(async () => {
        if (!user) return;
        const docs = await getAllLists(user);
        if (docs.type !== "success") {
            return console.error(docs.data);
        }
        const tasks = await getAllTasks(user, docs.data);
        if (tasks.type !== "success") {
            return console.error(tasks.data);
        }
        setCategory(docs.data);
        setTaskArray(tasks.data);
    }, [user]);

    const isAnAdmin = useCallback(async () => {
        if (!user) return;
        const getAdmin = await isUserWithAdminRights(user);
        if (getAdmin.type === "success") {
            setAdmin(getAdmin.data);
        }
    }, [user]);

    const publish = async () => {
        setUserLoading(last => ++last);
        await updateLists();
        setUserLoading(last => --last);
    };

    useEffect(() => {
        if (categories && categories.length > 0) {
            let available = false;
            categories.forEach((item, index) => {
                if (item.key === params.listid) {
                    available = true;
                    setCurrentList({
                        key: item.key,
                        label: (item.label.type ? "Starred" : item.label),
                        index,
                    });
                }
            });
            if (!available) navigate("/lists/default", { replace: true });
        }
    }, [categories, navigate, params.listid]);

    useEffect(() => {
        if (!loading && !user) {
            return navigate("/", { replace: true });
        }
        if (error) console.error(error);
    }, [error, loading, navigate, params.listid, user]);

    useEffect(() => {
        (async function () {
            await updateLists();
            await isAnAdmin();
        })();
    }, [isAnAdmin, params.listid, updateLists]);
    return (
        <>
            {!loading && <>
                <Routes>
                    <Route path="/settings/*" element={<ProfileMenu admin={admin} user={user} />} />
                    <Route path="/newlist" element={<NewList publish={publish} />} />
                    <Route path="/renamelist" element={<NewList currentList={currentList} publish={publish} />} />
                    <Route path="/newtask" element={<NewTask publish={publish} />} />
                    <Route path="/*" element={<Listing user={user} admin={admin} userLoading={userLoading} categories={categories} currentList={currentList} publish={publish} taskArray={taskArray} />} />
                </Routes>
            </>}
            {(categories.length === 0) && <LoadCircle />}
        </>
    );
}

