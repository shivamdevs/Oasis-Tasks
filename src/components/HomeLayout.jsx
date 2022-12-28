import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import app, { NavAnchor, NavReplace } from "../appdata";
import { getAllLists, getAllTasks } from "../fb.todo";
import { auth } from "../fb.user";

import css from './../styles/Home.module.css';
import Layout from "./Layout";
import { LoadCircle } from "./Loading";
import NewList from "./pages/NewList";
import NewTask from "./pages/NewTask";
import ProfileMenu from "./pages/Profile";


function HomeLayout() {
    return (
        <>
            <Routes>
                <Route path="/:listid/*" element={<Home />} />
                <Route path="/" element={<RedirectToList/>} />
            </Routes>
        </>
    );
};

export default HomeLayout;

function RedirectToList() {
    const navigate = useNavigate();
    let bucket = "default";
    if (window.localStorage) {
        let bucket = window.localStorage.getItem(`${app.name.replaceAll(' ', '').toLowerCase()}.current.bucket`);
        if (bucket === null) {
            bucket = "default";
            window.localStorage.setItem(`${app.name.replaceAll(' ', '').toLowerCase()}.current.bucket`, bucket);
        }
    }
    useEffect(() => navigate(`/lists/${bucket}`, { replace: true }), [bucket, navigate]);
}

function Home() {
    const [user, loading, error] = useAuthState(auth);

    const [userPhoto, setUserPhoto] = useState("");
    const [userName, setUserName] = useState("");

    const params = useParams();

    const [categories, setCategory] = useState([]);
    const [taskArray, setTaskArray] = useState({});

    const navigate = useNavigate();

    const updateLists = useCallback(async () => {
        const docs = await getAllLists(user);
        if (docs.type !== "success") {
            return toast.error(docs.data);
        }

        let available = false;
        docs.data.forEach(item => {
            if (item.key === params.listid) available = true;
        });
        if (!available) navigate("/lists/default", { replace: true });
        const tasks = await getAllTasks(user, docs.data);
        console.log(tasks);
        if (tasks.type !== "success") {
            return toast.error(tasks.data);
        }
        setCategory(docs.data);
        setTaskArray(tasks.data);
    }, [navigate, params.listid, user]);

    useEffect(() => {
        if (!user) navigate("/", {replace: true});
        if (!loading && user) {
            setUserName(user.displayName);
            setUserPhoto(user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=624ef0&color=fff`);
        }
        if (error) toast.error(error);
    }, [error, loading, navigate, user, userName]);

    useEffect(() => {
        (async function() {
            await updateLists();
        })();
    }, [updateLists]);
    return (
        <>
            <Layout className={css.listbody}>
                <div className={css.header}>
                    <img src="/logo192.png" alt="" className={css.headerTitle} />
                    <div className={css.headerSearch}>
                        <input type="search" name="search" id="search" autoComplete="off" placeholder="Search list..." />
                        <NavAnchor to="./settings" className={css.headerUser}>
                            <img src={userPhoto} alt="" />
                        </NavAnchor>
                    </div>
                </div>
                <div className={css.categories}>
                    {categories && (categories.length > 0) && categories.map(item => {
                        return (<NavReplace
                            key={item.key}
                            className={css.category}
                            bucket={item.key}
                            current={params.listid}
                            to={`/lists/${item.key}`}
                            activeClassName={css.activeCategory}
                        >
                            {item.label === "*star*" ? <i className="fas fa-star"></i> : item.label}
                        </NavReplace>);
                    })}
                    <NavAnchor className={css.category} to="./newlist" replace={false}>+ New list</NavAnchor>
                </div>
                <div className={css.tasksBody}>
                    <div className={css.emptyList}>

                    </div>
                    {taskArray[params.listid].map(item => {
                        return <TaskItem key={item.id} data={item} />
                    })}
                </div>
                <div className={css.appFooter}>
                    <NavAnchor className={css.footerIcon} to="./viewlists" replace={false}><i className="fas fa-list-tree"></i></NavAnchor>
                    <NavAnchor className={css.footerIcon} to="./listoptions" replace={false}><i className="fas fa-ellipsis-vertical"></i></NavAnchor>
                    {(params.listid !== "starred") && <NavAnchor className={css.footerAddIcon} to="./newtask" replace={false}><i className="fas fa-plus"></i></NavAnchor>}
                </div>
                <Routes>
                    <Route path="/settings/*" element={<ProfileMenu />} />
                    <Route path="/newlist" element={<NewList />} />
                    <Route path="/newtask" element={<NewTask />} />
                </Routes>
                {(categories.length === 0) && <LoadCircle />}
            </Layout>
        </>
    );
}


function TaskItem({data = {}}) {
    return (<div>{data.task}<br />{data.detail}</div>);
}