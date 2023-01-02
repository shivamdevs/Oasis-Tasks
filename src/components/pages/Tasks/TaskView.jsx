import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../../layouts/Layout";
import css from './../../../styles/Home.module.css';
import { BackHeaderForTasks } from "../../parts/BackHeader";
import { updateTask } from "../../../fb.todo";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import DeleteTask from "./overlays/DeleteTask";
import NewTask from "../lists/NewTask";
import Select from "react-select";


function TaskView({ goBack = null, categories = [], taskArray = {}, publish = null }) {
    const params = useParams();
    const navigate = useNavigate();
    const [currentTask, setCurrentTask] = useState({});
    const [updating, setUpdating] = useState(0);

    useEffect(() => {
        if (!taskArray || !taskArray.$allTasks || !taskArray.$allTasks[params.taskid]) return goBack();
        setCurrentTask(taskArray.$allTasks[params.taskid]);
    }, [currentTask, goBack, params.taskid, taskArray]);

    let listCurrent = {};
    const listCategories = [];

    if (categories.length) {
        categories.forEach(list => {
            const value = { value: list.key, label: list.label };
            if (list.key !== "starred") listCategories.push(value);
            if (currentTask.list === list.key) listCurrent = value;
        });
    }

    const listChanged = async ({value, label}) => {
        if (!value) return;
        setUpdating(old => ++old);
        await updateTask(currentTask.id, { list: value });
        publish && await publish();
        setUpdating(old => --old);
        toast.success("Task moved to " + label);
    };

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
                <div className={css.todoSelectArea}>
                    {listCategories.length && <>
                        <Select
                            isSearchable={false}
                            className={css.todoSelect}
                            options={listCategories}
                            onChange={listChanged}
                            placeholder={listCurrent?.label}
                        />
                    </>}
                </div>
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
                <Route path="/edittask" element={<NewTask publish={publish} currentTask={currentTask} />} />
                <Route path="/deletetask" element={<DeleteTask flipData={flipData} goBack={goBack} />} />
            </Routes>
        </Layout>
    );
};

export default TaskView;