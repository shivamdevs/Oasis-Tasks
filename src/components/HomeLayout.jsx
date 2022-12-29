import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import app, { NavAnchor, NavReplace } from "../appdata";
import { getAllLists, getAllTasks, updateTask } from "../fb.todo";
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
        bucket = window.localStorage.getItem(`${app.name.replaceAll(' ', '').toLowerCase()}.current.bucket`);
        if (bucket === null) {
            bucket = "default";
            window.localStorage.setItem(`${app.name.replaceAll(' ', '').toLowerCase()}.current.bucket`, bucket);
        }
    }
    useEffect(() => {navigate(`/lists/${bucket}`, { replace: true })});
}

function Home() {
    const [user, loading, error] = useAuthState(auth);

    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const [userLoading, setUserLoading] = useState(false);

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
        setUserLoading(false);
    }, [user]);

    useEffect(() => {
        if (categories && categories.length > 0) {
            let available = false;
            categories.forEach((item, index) => {
                if (item.key === params.listid) {
                    available = true;
                    setCurrentList({
                        key: item.key,
                        label: (item.label === "*star*" ? "Starred" : item.label),
                        index,
                    });
                }
            });
            if (!available) navigate("/lists/default", { replace: true });
        }
    }, [categories, navigate, params.listid]);

    useEffect(() => {
        if (!loading) {
            if (user) {
                setUserName(user.displayName);
                setUserPhoto(user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=624ef0&color=fff`);
            } else {
                return navigate("/", { replace: true });
            }
        }
        if (error) console.error(error);
    }, [error, loading, navigate, user, userName]);

    useEffect(() => {
        (async function () {
            await updateLists();
        })();
    }, [updateLists]);
    return (
        <>
            <Layout className={css.listbody}>
                <div className={css.header}>
                    <img src="/logo192.png" alt="" className={css.headerTitle} />
                    <div className={css.headerSearch}>
                        <input type="search" name="search" id="search" autoComplete="off" placeholder={`Search ${currentList.label || "list"}...`} />
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
                            id={`title-${item.key}`}
                            to={`/lists/${item.key}`}
                            activeClassName={css.activeCategory}
                        >
                            {item.label === "*star*" ? <i className="fas fa-star"></i> : item.label}
                        </NavReplace>);
                    })}
                    <NavAnchor className={css.category} to="./newlist" replace={false}>+ New list</NavAnchor>
                </div>
                <div className={css.tasksBody}>
                    {categories && (categories.length > 0) && <Carousel
                        swipeable={true}
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={false}
                        transitionTime={300}
                        showIndicators={false}
                        swipeScrollTolerance={20}
                        selectedItem={currentList.index}
                        onChange={(index, item) => (index !== currentList.index) && navigate(`/lists/${item.key.slice(2)}`, {replace: true})}
                    >
                        {categories && (categories.length > 0) && categories.map(item => <TaskList key={item.key} publish={updateLists} item={item.key} data={taskArray[item.key] || []} />)}
                    </Carousel>}
                </div>
                <div className={css.appFooter}>
                    <NavAnchor className={css.footerIcon} to="./viewlists" replace={false}><i className="fas fa-list-tree"></i></NavAnchor>
                    <NavAnchor className={css.footerIcon} to="./listoptions" replace={false}><i className="fas fa-ellipsis-vertical"></i></NavAnchor>
                    <span className={css.footerIcon} onClick={() => { setUserLoading(true); updateLists(); }}><i className="far fa-cloud-arrow-down"></i></span>
                    {(params.listid !== "starred") && <NavAnchor className={css.footerAddIcon} to="./newtask" replace={false}><i className="fas fa-plus"></i></NavAnchor>}
                </div>
                <Routes>
                    <Route path="/settings/*" element={<ProfileMenu />} />
                    <Route path="/newlist" element={<NewList publish={updateLists} />} />
                    <Route path="/newtask" element={<NewTask publish={updateLists} />} />
                </Routes>
                {(categories.length === 0 || userLoading) && <LoadCircle />}
            </Layout>
        </>
    );
}


function TaskItem({ data = {}, publish }) {
    const task = data;
    const navigate = useNavigate();
    const flipData = async (field) => {
        const value = !task[field];
        const wait = await updateTask(task.id, field, value);
        if (wait.type !== "success") {
            return toast.error(wait.data);
        }
        publish();
    };
    return (
        <div className={css.taskBar}>
            <button type="button" onClick={() => flipData('checked')}>
                {task.checked && <span><i className="far fa-check"></i></span>}
                {!task.checked && <span><i className="far fa-circle"></i></span>}
            </button>
            <div className={css.taskBarContent} onClick={() => navigate(`./${task.id}`)}>
                <div className={css.taskBarLabel}>{task.task}</div>
                {task.detail && <div className={css.taskBarDetail}>{task.detail}</div>}
            </div>
            <button type="button" onClick={() => flipData('starred')}>
                {task.starred && <span><i className="fas fa-star"></i></span>}
                {!task.starred && <span><i className="far fa-star"></i></span>}
            </button>
        </div>
    );
}

function TaskList({ data = [], item = "", publish }) {
    const [extended, setExtended] = useState(false);
    return (
        <div className={css.tasksBlock}>
            {(data.length > 0 || data.completed.length > 0) && <>
                {data.map(item => <TaskItem key={item.id} publish={publish} data={item} />)}
                {(data.completed.length > 0) && <>
                    <div className={css.taskCompletedHeader} onClick={() => setExtended(!extended)}>
                        <span>Completed ({data.completed.length})</span>
                        {extended && <span className={css.taskCompletedArrow}><i className="fas fa-chevron-up"></i></span>}
                        {!extended && <span className={css.taskCompletedArrow}><i className="fas fa-chevron-down"></i></span>}
                    </div>
                    {extended && data.completed.map(done => <TaskItem key={done.id} publish={publish} data={done} />)}
                </>}
            </>}
            {(data.length === 0 && data.completed.length === 0) && <>
                {item === "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-stars.svg" alt="" />
                    <div className={css.taskEmptyText}>You haven't got any stars!</div>
                    <div className={css.taskEmptyNote}>Add tasks as <strong>Starred</strong> by clicking on the stars beside them.</div>
                </div>}
                {item !== "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-waiting.svg" alt="" />
                    <div className={css.taskEmptyText}>Waiting for you to add something!</div>
                    <div className={css.taskEmptyNote}>Add new tasks by clicking on <strong>+</strong> icon below.</div>
                </div>}
            </>}
        </div>
    );
}