import { useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AllCategories from "../pages/lists/overlays/AllCategories";
import CategoryOptions from "../pages/lists/overlays/CategoryOptions";
import DeleteAllCompleted from "../pages/lists/overlays/DeleteAllCompleted";
import DeleteList from "../pages/lists/overlays/DeleteList";
import TaskView from "../pages/Tasks/TaskView";


function TaskLayout({ taskArray = {}, categories = [], currentList = {}, publish = null }) {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = useCallback(() => {
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate("/");
        }
    }, [location.key, navigate]);


    return (
        <Routes>
            <Route path="/allcategories" element={<AllCategories categories={categories} currentList={currentList} />} />
            <Route path="/categoryoptions" element={<CategoryOptions taskArray={taskArray} currentList={currentList} publish={publish} />} />
            <Route path="/deletelist" element={<DeleteList currentList={currentList} publish={publish} />} />
            <Route path="/deletecompleted" element={<DeleteAllCompleted currentList={currentList} taskArray={taskArray} publish={publish} />} />
            <Route path="/:taskid/*" element={<TaskView goBack={goBack} taskArray={taskArray} publish={publish} />} />
        </Routes>
    );
};

export default TaskLayout;