import classNames from "classnames";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../../../fb.todo";
import { LoadSVG } from "../../Loading";
import css from './../../../styles/Home.module.css';

function TaskItem({ data = {}, publish = null, completed = false }) {
    const [loading, setLoading] = useState({ checked: false, starred: false });
    const task = data;
    const navigate = useNavigate();
    const flipData = async (field) => {
        const value = !task[field];
        setLoading(old => {
            const newLoad = { ...old };
            newLoad[field] = !newLoad[field];
            return newLoad;
        });
        const wait = await updateTask(task.id, field, value);
        if (wait.type !== "success") {
            return toast.error(wait.data);
        }
        await publish();
        setLoading(old => {
            const newLoad = { ...old };
            newLoad[field] = !newLoad[field];
            return newLoad;
        });
    };
    return (
        <div className={css.taskBar}>
            <button type="button" onClick={() => flipData('checked')}>
                {!loading.checked && <>
                    {task.checked && <span><i className="far fa-check"></i></span>}
                    {!task.checked && <span><i className="far fa-circle"></i></span>}
                </>}
                {loading.checked && <>
                    <span><LoadSVG width={12} color="#727888" /></span>
                </>}
            </button>
            <div className={classNames(css.taskBarContent, (completed ? css.taskBarContentDone : ""))} onClick={() => navigate(`/lists/t/${task.id}`)}>
                <div className={css.taskBarLabel}>{task.task}</div>
                {task.detail && <div className={css.taskBarDetail}>{task.detail}</div>}
            </div>
            <button type="button" onClick={() => flipData('starred')}>
                {!loading.starred && <>
                    {task.starred && <span><i className="fas fa-star"></i></span>}
                    {!task.starred && <span><i className="far fa-star"></i></span>}
                </>}
                {loading.starred && <>
                    <span><LoadSVG width={12} color="#727888" /></span>
                </>}
            </button>
        </div>
    );
}

export default TaskItem;