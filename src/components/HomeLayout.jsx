import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { NavAnchor, NavReplace } from "../appdata";
import { auth } from "../fb.user";

import css from './../styles/Home.module.css';
import Layout from "./Layout";
import NewList from "./pages/NewList";


function HomeLayout() {
    const [user, loading, error] = useAuthState(auth);

    const [userPhoto, setUserPhoto] = useState("");
    const [userName, setUserName] = useState("");

    const [newList , setNewList] = useState(false);

    const params = useParams();
    console.log(params);
    const categories = [
    ];

    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate(-1);
        console.log(user);
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
                        <NavAnchor to="/profile" className={css.headerUser}>
                            <img src={userPhoto} alt="" />
                        </NavAnchor>
                    </div>
                </div>
                <div className={css.categories}>
                    <NavReplace key="default" activeClassName={css.activeCategory} className={css.category} to="/lists/default">My tasks</NavReplace>
                    {categories && categories.map(item => <NavReplace key={item.key} bucket={item.key} className={css.category} activeClassName={css.activeCategory} to={`/lists/${item.key}`}>{item.label}</NavReplace>)}
                    <NavAnchor className={css.category} onClick={() => setNewList(true)} to="/lists/newlist" replace={false}>+ New List</NavAnchor>
                </div>
            </Layout>
            {newList && <NewList />}
        </>
    );
};

export default HomeLayout;