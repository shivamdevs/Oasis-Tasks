import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import app, { NavAnchor, NavReplace } from "../appdata";
import { getAllLists } from "../fb.todo";
import { auth } from "../fb.user";

import css from './../styles/Home.module.css';
import Layout from "./Layout";
import { LoadCircle } from "./Loading";
import NewList from "./pages/NewList";


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

    const navigate = useNavigate();

    const updateLists = async () => {
        const docs = await getAllLists(user);
        if (docs.type === "success") {
            let available = false;
            docs.data.forEach(item => {
                if (item.key === params.listid) available = true;
            });
            if (!available && params.listid !== "newlist") navigate("/lists/default", {replace: true});
            return setCategory(() => [
                {
                    label: '*star*',
                    key: "starred",
                },
                {
                    label: "My tasks",
                    key: "default",
                },
                ...docs.data
            ]);
        }
        toast.error(docs.data);
    };
    updateLists();

    useEffect(() => {
        if (!user) navigate("/", {replace: true});
        if (!loading && user) {
            setUserName(user.displayName);
            setUserPhoto(user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=624ef0&color=fff`);
        }
        if (error) console.log(error);
    }, [error, loading, navigate, user, userName]);
    return (
        <>
            <Layout>
                <div className={css.header}>
                    <img src="/logo192.png" alt="" className={css.headerTitle} />
                    <div className={css.headerSearch}>
                        <input type="search" name="search" id="search" placeholder="Search category..." />
                        <NavAnchor to="/settings" className={css.headerUser}>
                            <img src={userPhoto} alt="" />
                        </NavAnchor>
                    </div>
                </div>
                <div className={css.categories}>
                    {categories && (categories.length > 0) && categories.map(item => {
                        return (<NavReplace
                            key={item.key}
                            bucket={item.key}
                            className={css.category}
                            activeClassName={css.activeCategory}
                            to={`/lists/${item.key}`}
                        >
                            {item.label === "*star*" ? <i className="fas fa-star"></i> : item.label}
                        </NavReplace>);
                    })}
                    <NavAnchor className={css.category} to="/lists/newlist" replace="false">+ New List</NavAnchor>
                </div>
                {(categories.length === 0) && <LoadCircle />}
                {params.listid === "newlist" && <NewList perform={updateLists} />}
            </Layout>
        </>
    );
}