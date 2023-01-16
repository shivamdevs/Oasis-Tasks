import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { updateTask } from "../../fb.todo";
import NewTask from "./NewTask";
import DeleteTask from "./tasks/DeleteTask";
import Viewer from "./tasks/Viewer";


function TaskWindow({publish = null, taskArray = [], categories = [], currentList = {}}) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentTask, setCurrentTask] = useState({});
    const [updating, setUpdating] = useState(0);

    const goBack = useCallback(() => {
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate("/");
        }
    }, [location.key, navigate]);

    useEffect(() => {
        if (categories.length !== 0 && !taskArray.$allTasks[params.taskid]) return goBack();
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

    return (
        <Routes>
            <Route path="/" element={<Viewer currentList={currentList} currentTask={currentTask} updating={updating} flipData={flipData} setUpdating={setUpdating} publish={publish} />} />
            <Route path="/edittask" element={<NewTask setUpdating={setUpdating} currentTask={currentTask} currentList={currentList} publish={publish} />} />
            <Route path="/deletetask" element={<DeleteTask goBack={goBack} flipData={flipData} />} />
        </Routes>
    );
}

export default TaskWindow;