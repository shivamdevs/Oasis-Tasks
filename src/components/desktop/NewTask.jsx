import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setTitle } from "../../app.functions";
import { addNewTask, updateTask } from "../../fb.todo";
import { auth } from "../../fb.user";
import { LoadCircle } from "../layouts/Loading";
import CenterLayer from "./CenterLayer";
import css from './styles/Adder.module.css';


function NewTask({ currentTask = null, currentList = null, publish = null, setUpdating = null }) {

    const navigate = useNavigate();

    const params = useParams();

    const textarea = useRef();

    const [user] = useAuthState(auth);
    const [task, setTask] = useState(currentTask?.task || "");
    const [detail, setDetail] = useState(currentTask?.detail || "");
    const [taskErr, setTaskError] = useState("");
    const [detailErr, setDetailError] = useState("");
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        textarea.current.style.height = 'inherit';
        textarea.current.style.height = (textarea.current.scrollHeight + 10) + 'px';
    }, [detail]);

    setTitle(currentTask ? "Edit task" : "Add new task", currentTask?.task, currentList?.label);
    const submitForm = async (e) => {
        e.preventDefault();
        const posttask = task.trim();
        if (!posttask) return e.target[0].focus();
        setDisabled(true);
        const data = currentTask ? await updateTask(currentTask.id, { task: posttask, detail }) : await addNewTask(user, (params.listid === "starred" ? "default" : params.listid), posttask, detail, (params.listid === "starred"));
        if (data.type === "success") {
            navigate(-1);
            setUpdating && setUpdating(old => ++old);
            await publish();
            setUpdating && setUpdating(old => --old);
            return ;
        }
        setDisabled(false);
        if (data.action === "task") {
            setTaskError(data.data);
            e.target[0].focus();
        } else if (data.action === "detail") {
            setDetailError(data.data);
            e.target[1].focus();
        } else if (data.action === "toast") {
            toast.error(data.data);
        } else {
            console.error(data);
        }
    };
    return (
        <CenterLayer maxWidth={700}>
            <header className={css.header}>
                <span>{currentTask ? "Edit task" : "Add new task"}</span>
                <Link to={-1} className={css.closer}><i className="fas fa-times"></i></Link>
            </header>
            <form  onSubmit={submitForm} className={css.body}>
                <input className={css.input} type="text" autoComplete="off" placeholder="Task label..." autoFocus onChange={({target}) => setTask(target.value)} disabled={disabled} defaultValue={task} />
                <div className={css.error}>{taskErr}</div>
                <textarea className={css.textarea} autoComplete="off" placeholder="Task details..." ref={textarea} onChange={({ target }) => setDetail(target.value)} disabled={disabled} defaultValue={detail}></textarea>
                <div className={css.error}>{detailErr}</div>
                <div className={css.flexbox}>
                    <Link to={-1} className={css.button}>Cancel</Link>
                    <button className={css.button} disabled={disabled} type="submit">{currentTask ? "Update" : "Create"}</button>
                </div>
            </form>
            {disabled && <LoadCircle />}
        </CenterLayer>
    )
}

export default NewTask;