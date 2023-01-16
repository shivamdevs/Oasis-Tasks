import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import app from "../../app.data";
import { setTitle } from "../../app.functions";
import Layout from "../layouts/Layout";
import NewTask from "../pages/lists/NewTask";
import css from './styles/Home.module.css';
import NewList from "./NewList";
import HomeMain from "./HomeMain";
import DeleteAllCompleted from "./lists/DeleteAllCompleted";
import DeleteList from "./lists/DeleteList";


function HomeWindow({ user = {}, admin = null, categories = [], currentList = {}, publish = null, taskArray = {}, userLoading = false }) {
    setTitle(currentList.label || "Loading");

    const params = useParams();
    const activeTab = useRef();
    const [activeRef, setActiveRef] = useState(null);

    useEffect(() => {
        if (activeTab?.current && activeRef) {
            const referer = activeTab.current;
            const differ = 3;
            referer.style.top = (activeRef.offsetTop + differ) + "px";
            referer.style.height = (activeRef.offsetHeight - (2 * differ)) + "px";
            referer.style.transition = ".3s";
        }
    }, [params.listid, activeRef, activeTab, categories]);

    return (
        <Layout className={css.layout}>
            <div className={css.sider}>
                <div className={css.sideheader}>
                    <Link to="/lists/default" className={css.headerFlow}>
                        <img src="/logo192.png" alt="" className={css.headerTitle} />
                        <div className={css.headerLabel}>{app.name}</div>
                    </Link>
                    <div className={css.headerFlow}>
                        {admin && <Link to={`/admin/${admin.id}`} className={css.headerAdmin}><i className="fa-solid fa-user-shield"></i></Link>}
                        <Link to="./settings" className={css.headerUser}>
                            <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=624ef0&color=fff`} alt="" />
                        </Link>
                    </div>
                </div>
                <Link to="./newlist" className={css.addNewList}>
                    <i className="fas fa-plus"></i>
                    <span>Add new list</span>
                </Link>
                <div className={classNames(css.categories, css.scroller)} onScroll={({target}) => {
                    if (target.scrollTop > 0) target.classList.add(css.categoriesScroll); else target.classList.remove(css.categoriesScroll);
                }}>
                    {categories && (categories.length > 0) && categories.map(item => <ListItem key={item.key}
                        bucket={item.key}
                        current={params.listid}
                        to={`/lists/${item.key}`}
                        setRef={setActiveRef}>{item.label}</ListItem>)}
                    <div className={css.activeTab} ref={activeTab}></div>
                </div>
            </div>
            <main className={css.body}>
                <Routes>
                    <Route path="/*" element={<HomeMain publish={publish} userLoading={userLoading} currentList={currentList} categories={categories} taskArray={taskArray} />} />
                </Routes>
            </main>
            <Routes>
                <Route path="/deletelist" element={<DeleteList currentList={currentList} publish={publish} />} />
                <Route path="/deletecompleted" element={<DeleteAllCompleted currentList={currentList} taskArray={taskArray} publish={publish} />} />
                <Route path="/newlist" element={<NewList publish={publish} />} />
                <Route path="/renamelist" element={<NewList currentList={currentList} publish={publish} />} />
                <Route path="/newtask" element={<NewTask publish={publish} />} />
            </Routes>
        </Layout>
    )
}

export default HomeWindow;


function ListItem({
    to,
    children = "",
    bucket = "default",
    current = "default",
    setRef = null,
    ...props
}) {
    const navigate = useNavigate();
    const [isActive, setActive] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        setActive(current === bucket);
        if (current === bucket) {
            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            setRef && setRef(ref?.current);
        }
    }, [bucket, current, setRef]);

    const clickAction = (e) => {
        e.preventDefault();
        navigate(to);
        if (window.localStorage) {
            window.localStorage.setItem(`${app.bucket}.current.bucket`, bucket);
        }
    };
    return (
        <a {...props} href={to} ref={ref} className={classNames(
            css.category,
            (isActive ? css.activeCategory : ""),
        )} onClick={clickAction}>{children.type ? "Starred" : children}</a>
    );
}