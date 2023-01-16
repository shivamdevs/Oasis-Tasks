import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../../layouts/Layout";
import css from './../../../styles/Home.module.css';
import { BackHeaderForTasks } from "../../parts/BackHeader";
import { updateTask } from "../../../fb.todo";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import DeleteTask from "./overlays/DeleteTask";
import MoveTask from "./overlays/MoveTask";
import NewTask from "../lists/NewTask";
import { NavAnchor } from './../../parts/Nav';


function TaskView({ goBack = null, categories = [], taskArray = {}, publish = null }) {
    const params = useParams();
    const navigate = useNavigate();
    const [currentTask, setCurrentTask] = useState({});
    const [updating, setUpdating] = useState(0);

    useEffect(() => {
        if (!taskArray?.$allTasks) return;
        if (!taskArray.$allTasks[params.taskid]) return goBack();
        const taskobj = taskArray.$allTasks[params.taskid];
        for (const lists of categories) {
            if (lists.key === taskobj.list) taskobj.listname = lists.label;
        }
        setCurrentTask(taskobj);
    }, [categories, currentTask, goBack, params.taskid, taskArray]);

    const flipData = async (field) => {
        const value = !currentTask[field];
        setUpdating(old => ++old);
        const update = {};
        update[field] = value;
        const wait = await updateTask(currentTask.id, update);
        if (wait.type !== "success") {
            return toast.error(wait.data);
        }
        publish && await publish();
        setUpdating(old => --old);
    };

    const toEditPage = () => navigate("./edittask");

    return (
        <Layout className={css.todoLayer}>
            <BackHeaderForTasks
                buttons={[
                    {
                        label: "far fa-cloud-check",
                        disabled: (updating > 0),
                        async action() {
                            setUpdating(old => ++old);
                            await publish();
                            setUpdating(old => --old);
                            toast.success("Task updated");
                        }
                    },
                    {
                        label: "far fa-share-nodes",
                        action() {
                            toast("Sharing is not available at the moment", { duration: 1500 });
                        }
                    },
                    {
                        label: currentTask.starred ? "fas fa-star" : "far fa-star",
                        action() {
                            flipData("starred");
                        }
                    },
                    {
                        label: "fas fa-trash",
                        action() {
                            navigate("./deletetask");
                        }
                    }
                ]}
            />
            <div className={css.todoBody}>
                <NavAnchor to="./movetask" className={css.todoMove}>
                    <span>{currentTask.listname}</span>
                    <i className="fas fa-caret-down"></i>
                </NavAnchor>
                <div className={css.todoTask} onClick={toEditPage}>{currentTask.task}</div>
                {currentTask.detail && <div className={css.todoDetail} onClick={toEditPage}>{currentTask.detail}</div>}
                {!currentTask.detail && <div className={css.todoDetail} onClick={toEditPage}><i className="far fa-bars-sort"></i> &nbsp; Add details</div>}
            </div>
            <div className={css.todoFooter}>
                <span className={css.todoFooterOpts} onClick={toEditPage}>Edit task</span>
                <span className={css.todoFooterOpts} onClick={() => flipData("checked")}>
                    {currentTask.checked && "Mark as Incomplete"}
                    {!currentTask.checked && "Mark as Completed"}
                </span>
            </div>
            <Routes>
                <Route path="/edittask" element={<NewTask setUpdating={setUpdating} publish={publish} currentTask={currentTask} />} />
                <Route path="/movetask" element={<MoveTask publish={publish} categories={categories} setUpdating={setUpdating} currentList={currentTask.list} />} />
                <Route path="/deletetask" element={<DeleteTask flipData={flipData} goBack={goBack} />} />
            </Routes>
        </Layout>
    );
};

export default TaskView;