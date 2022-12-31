import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Carousel } from "react-responsive-carousel";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import app from "../appdata";
import { getAllLists, getAllTasks } from "../fb.todo";
import { auth } from "../fb.user";

import css from './../styles/Home.module.css';
import Layout from "./Layout";
import { LoadCircle, LoadSVG } from "./Loading";
import { NavAnchor } from "./Nav";
import NavReplace from "./pages/tasks/NavReplace";
import NewList from "./pages/tasks/NewList";
import NewTask from "./pages/tasks/NewTask";
import AllCategories from "./pages/tasks/overlays/AllCategories";
import CategoryOptions from "./pages/tasks/overlays/CategoryOptions";
import DeleteAllCompleted from "./pages/tasks/overlays/DeleteAllCompleted";
import DeleteList from "./pages/tasks/overlays/DeleteList";
import ProfileMenu from "./pages/tasks/settings/Profile";
import TaskItem from "./pages/tasks/TaskItem";


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
                <Route path="/t/*" element={<>Tasks</>} />
                <Route path="/settings/*" element={<ProfileMenu />} />
                <Route path="/newlist" element={<NewList publish={publish} />} />
                <Route path="/renamelist" element={<NewList currentList={currentList} publish={publish} />} />
                <Route path="/newtask" element={<NewTask publish={publish} />} />
                <Route path="/*" element={<Listing user={user} userLoading={userLoading} categories={categories} currentList={currentList} publish={publish} taskArray={taskArray} />} />
            </Routes>
            {(categories.length === 0) && <LoadCircle />}
        </>
    );
}

function Listing({user = {}, categories = [], currentList = {}, publish = null, taskArray = {}, userLoading = false}) {
    const params = useParams();
    const navigate = useNavigate();
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
                        bucket={item.key}
                        current={params.listid}
                        to={`/lists/${item.key}`}
                    >
                        {item.label === "*star*" ? <i className="fas fa-star"></i> : item.label}
                    </NavReplace>);
                })}
                <NavAnchor className={css.category} to="./newlist" replace={false}><small><i className="fas fa-plus"></i></small> New list</NavAnchor>
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
                    swipeScrollTolerance={25}
                    selectedItem={currentList.index}
                    preventMovementUntilSwipeScrollTolerance={true}
                    onChange={(index, item) => (index !== currentList.index) && navigate(`/lists/${item.key.slice(2)}`, { replace: true })}
                >
                    {categories && (categories.length > 0) && categories.map(item => <TaskList key={item.key} publish={publish} item={item.key} data={taskArray[item.key] || []} />)}
                </Carousel>}
            </div>
            <div className={css.appFooter}>
                <NavAnchor className={css.footerIcon} to="./allcategories" replace={false}><i className="fas fa-list-tree"></i></NavAnchor>
                {(userLoading > 0) && <span className={css.footerIcon}><LoadSVG color="#1e90ff" width={12} /></span>}
                {(userLoading === 0) && <span className={css.footerIcon} onClick={publish}><i className="far fa-cloud-check"></i></span>}
                {(params.listid !== "starred") && <NavAnchor className={css.footerAddIcon} to="./newtask" replace={false}><i className="fas fa-plus"></i></NavAnchor>}
                <NavAnchor className={css.footerIcon} to="./categoryoptions" replace={false}><i className="fas fa-ellipsis-vertical"></i></NavAnchor>
            </div>
            <Routes>
                <Route path="/allcategories" element={<AllCategories categories={categories} currentList={currentList} />} />
                <Route path="/categoryoptions" element={<CategoryOptions taskArray={taskArray} currentList={currentList} publish={publish} />} />
                <Route path="/deletelist" element={<DeleteList currentList={currentList} publish={publish} />} />
                <Route path="/deletecompleted" element={<DeleteAllCompleted currentList={currentList} taskArray={taskArray} publish={publish} />} />
            </Routes>
        </Layout>
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
                    <div className={css.taskEmptyNote}>Add tasks as <strong>Starred</strong> by clicking on the <i className="far fa-star"></i> icon beside them.</div>
                </div>}
                {item !== "starred" && <div className={css.taskEmpty}>
                    <img src="/assets/images/lists/undraw-waiting.svg" alt="" />
                    <div className={css.taskEmptyText}>Waiting for you along!</div>
                    <div className={css.taskEmptyNote}>Add new tasks by clicking on <i className="fas fa-plus"></i> icon below.</div>
                </div>}
            </>}
        </div>
    );
}