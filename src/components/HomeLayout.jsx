import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import app, { NavAnchor } from "../appdata";
import { getAllLists, getAllTasks, updateTask } from "../fb.todo";
import { auth } from "../fb.user";

import css from './../styles/Home.module.css';
import Layout, { TransLayout } from "./Layout";
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
        if (!loading && !user) {
            return navigate("/", { replace: true });
        }
        if (error) console.error(error);
    }, [error, loading, navigate, user]);

    useEffect(() => {
        (async function () {
            await updateLists();
        })();
    }, [updateLists]);
    return (
        <>
            <Routes>
                <Route path="/settings/*" element={<ProfileMenu />} />
                <Route path="/newlist" element={<NewList publish={updateLists} />} />
                <Route path="/newtask" element={<NewTask publish={updateLists} />} />
                <Route path="/*" element={<Listing user={user} setUserLoading={setUserLoading} categories={categories} currentList={currentList} updateLists={updateLists} taskArray={taskArray} />} />
            </Routes>
            {(categories.length === 0 || userLoading) && <LoadCircle />}
        </>
    );
}

function Listing({user = {}, categories = [], currentList = {}, updateLists = null, taskArray = {}, setUserLoading = null}) {
    const params = useParams();
    const navigate = useNavigate();
    function navigateToList(key, replace = true, goBack = false) {
        goBack && navigate(-1);
        navigate(`/lists/${key}`, {replace: replace});
    }
    return (
        <Layout className={css.listbody}>
            <div className={css.header}>
                <img src="/logo192.png" alt="" className={css.headerTitle} />
                <div className={css.headerLabel}>{app.name}</div>
                <NavAnchor to="./settings" className={css.headerUser}>
                    <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=624ef0&color=fff`} alt="" />
                </NavAnchor>
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
                    swipeScrollTolerance={60}
                    selectedItem={currentList.index}
                    preventMovementUntilSwipeScrollTolerance={true}
                    onChange={(index, item) => (index !== currentList.index) && navigate(`/lists/${item.key.slice(2)}`, { replace: true })}
                >
                    {categories && (categories.length > 0) && categories.map(item => <TaskList key={item.key} publish={updateLists} item={item.key} data={taskArray[item.key] || []} />)}
                </Carousel>}
            </div>
            <div className={css.appFooter}>
                <NavAnchor className={css.footerIcon} to="./allcategories" replace={false}><i className="fas fa-list-tree"></i></NavAnchor>
                <NavAnchor className={css.footerIcon} to="./categoryoptions" replace={false}><i className="fas fa-ellipsis-vertical"></i></NavAnchor>
                <span className={css.footerIcon} onClick={() => { setUserLoading(true); updateLists(); }}><i className="far fa-cloud-arrow-down"></i></span>
                {(params.listid !== "starred") && <NavAnchor className={css.footerAddIcon} to="./newtask" replace={false}><i className="fas fa-plus"></i></NavAnchor>}
            </div>
            <Routes>
                <Route path="/allcategories" element={<AllCategories categories={categories} currentList={currentList} navigateToList={navigateToList} />} />
                <Route path="/categoryoptions" element={<CategoryOptions />} />
            </Routes>
        </Layout>
    );
}


function TaskItem({ data = {}, publish = null, completed = false }) {
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
            <div className={classNames(css.taskBarContent, (completed ? css.taskBarContentDone : ""))} onClick={() => navigate(`./${task.id}`)}>
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
    const header = useRef();
    useEffect(() => {
        if (extended) header.current.scrollIntoView({ behavior: 'smooth' });
    }, [extended]);
    return (
        <div className={css.tasksBlock}>
            {(data.length > 0 || data.completed.length > 0) && <>
                {data.map(item => <TaskItem key={item.id} publish={publish} data={item} />)}
                {(data.completed.length > 0) && <>
                    <div className={css.taskCompletedHeader} ref={header} onClick={() => setExtended(!extended)}>
                        <span>Completed ({data.completed.length})</span>
                        {extended && <span className={css.taskCompletedArrow}><i className="fas fa-chevron-up"></i></span>}
                        {!extended && <span className={css.taskCompletedArrow}><i className="fas fa-chevron-down"></i></span>}
                    </div>
                    {extended && data.completed.map(done => <TaskItem key={done.id} completed={true} publish={publish} data={done} />)}
                </>}
            </>}
            {(data.length === 0 && data.completed.length === 0) && <>
                {item === "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-stars.svg" alt="" />
                    <div className={css.taskEmptyText}>No stars is yours yet!</div>
                    <div className={css.taskEmptyNote}>Add tasks as <strong>Starred</strong> by clicking on the star beside them.</div>
                </div>}
                {item !== "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-waiting.svg" alt="" />
                    <div className={css.taskEmptyText}>Waiting for you along!</div>
                    <div className={css.taskEmptyNote}>Add new tasks by clicking on <strong>+</strong> icon below.</div>
                </div>}
            </>}
        </div>
    );
}


function NavReplace({
    to,
    children = "",
    className = "",
    bucket = "default",
    current = "default",
    activeClassName = "",
    ...props
}) {
    const navigate = useNavigate();
    const [isActive, setActive] = useState(false);
    const ref = useRef();
    useEffect(() => {
        setActive(current === bucket);
        if (current === bucket) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [bucket, current]);

    const clickAction = () => {
        navigate(to, { replace: true });
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        if (window.localStorage) {
            window.localStorage.setItem(`${app.bucket}.current.bucket`, bucket);
        }
    };
    return (
        <a {...props} ref={ref} className={classNames(
            className || "link",
            (isActive ? activeClassName || "active" : ""),
        )} onClick={clickAction}>{children}</a>
    );
};


function AllCategories({categories = {}, currentList = {}, navigateToList = null}) {
    return (
        <TransLayout className={css.categoryViewer}>
            {categories && (categories.length > 0) && categories.map(list => <span key={list.key}>
                <div onClick={() => navigateToList(list.key, true, true)} className={classNames(
                    css.categoryView,
                    (list.key === currentList.key ? css.categoryViewActive : "")
                )}>
                    <span>{(list.key === "starred" ? <i className="fas fa-star"></i> : list.key === "default" ? <i className="fas fa-feather-pointed"></i> : <i className="fas fa-tags"></i>)}</span>
                    <span>{(list.label === "*star*" ? "Starred" : list.label)}</span>
                </div>
                {(list.key === "starred") && <div className={css.categoryViewStarred}></div>}
            </span>)}
        </TransLayout>
    );
}

function CategoryOptions() {
    return (
        <TransLayout>
            Google it
        </TransLayout>
    );
}