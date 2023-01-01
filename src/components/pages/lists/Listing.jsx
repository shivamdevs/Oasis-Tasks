import { Carousel } from "react-responsive-carousel";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import app from "../../../appdata";
import Layout from "../../layouts/Layout";
import { LoadSVG } from "../../layouts/Loading";
import { NavAnchor } from "../../parts/Nav";
import NavReplace from "./NavReplace";
import TaskList from "./TaskList";
import css from './../../../styles/Home.module.css';
import TaskLayout from "../../layouts/TaskLayout";
import { toast } from "react-hot-toast";

function Listing({ user = {}, categories = [], currentList = {}, publish = null, taskArray = {}, userLoading = false }) {
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