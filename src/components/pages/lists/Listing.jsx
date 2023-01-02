import { Carousel } from "react-responsive-carousel";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import app from "../../../app.data";
import Layout from "../../layouts/Layout";
import { LoadSVG } from "../../layouts/Loading";
import { NavAnchor } from "../../parts/Nav";
import NavReplace from "./NavReplace";
import TaskList from "./TaskList";
import css from './../../../styles/Home.module.css';
import TaskLayout from "../../layouts/TaskLayout";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

function Listing({ user = {}, admin = null, categories = [], currentList = {}, publish = null, taskArray = {}, userLoading = false }) {
    const params = useParams();
    const navigate = useNavigate();

    const activeTab = useRef();
    const [activeRef, setActiveRef] = useState(null);

    useEffect(() => {
        if (activeTab?.current && activeRef) {
            const referer = activeTab.current;
            const differ = 20;
            referer.style.left = (activeRef.offsetLeft + differ) + "px";
            referer.style.width = (activeRef.offsetWidth - (2 * differ)) + "px";
            referer.style.transition = ".3s";
        }
    }, [params.listid, activeRef, activeTab]);

    return (
        <Layout className={css.listbody}>
            <div className={css.header}>
                <img src="/logo192.png" alt="" className={css.headerTitle} />
                <div className={css.headerLabel}>{app.name}</div>
                <div className={css.headerRight}>
                    {admin && <NavAnchor to={`/admin/${admin.id}`} className={css.headerAdmin}><i className="fa-solid fa-user-shield"></i></NavAnchor>}
                    <NavAnchor to="./settings" className={css.headerUser}>
                        <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=624ef0&color=fff`} alt="" />
                    </NavAnchor>
                </div>
            </div>
            <div className={css.categories}>
                {categories && (categories.length > 0) && categories.map(item => {
                    return (<NavReplace
                        key={item.key}
                        bucket={item.key}
                        current={params.listid}
                        to={`/lists/${item.key}`}
                        setRef={setActiveRef}
                    >
                        {item.label}
                    </NavReplace>);
                })}
                <NavAnchor className={css.category} to="./newlist" replace={false}><small><i className="fas fa-plus"></i></small> New list</NavAnchor>
                <div className={css.activeTab} ref={activeTab}></div>
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
                {(userLoading === 0) && <span className={css.footerIcon} onClick={async () => { await publish(); toast.success("All lists updated");}}><i className="far fa-cloud-check"></i></span>}
                {(params.listid !== "starred") && <NavAnchor className={css.footerAddIcon} to="./newtask" replace={false}><i className="fas fa-plus"></i></NavAnchor>}
                <NavAnchor className={css.footerIcon} to="./categoryoptions" replace={false}><i className="fas fa-ellipsis-vertical"></i></NavAnchor>
            </div>
            <Routes>
                <Route path="/*" element={<TaskLayout publish={publish} currentList={currentList} categories={categories} taskArray={taskArray} />} />
            </Routes>
        </Layout>
    );
}

export default Listing;