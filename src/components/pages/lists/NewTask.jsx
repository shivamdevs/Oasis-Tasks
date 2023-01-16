import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { addNewTask, updateTask } from "../../../fb.todo";
import { auth } from "../../../fb.user";
import { BackHeaderWithButton } from "../../parts/BackHeader";
import { FormLayout } from "../../layouts/Layout";
import { LoadCircle } from "../../layouts/Loading";
import css from './../../../styles/Home.module.css';

function NewTask({currentTask = null, publish, setUpdating = null}) {
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

    const submitForm = async (e) => {
        e.preventDefault();
        const posttask = task.trim();
        if (!posttask) return e.target[2].focus();
        setDisabled(true);
        const data = currentTask ? await updateTask(currentTask.id, { task: posttask, detail }) : await addNewTask(user, (params.listid === "starred" ? "default" : params.listid), posttask, detail, (params.listid === "starred"));
        if (data.type === "success") {
            navigate(-1);
            setUpdating(old => ++old);
            await publish();
            setUpdating(old => --old);
            return;
        }
        setDisabled(false);
        if (data.action === "task") {
            setTaskError(data.data);
            e.target[2].focus();
        } else if (data.action === "detail") {
            setDetailError(data.data);
            e.target[3].focus();
        } else if (data.action === "toast") {
            toast.error(data.data);
        } else {
            console.error(data);
        }
    };
    return (
        <FormLayout className={css.newlist} onSubmit={submitForm}>
            <BackHeaderWithButton label={currentTask ? "Edit task" : "Add new task"} button={currentTask ? "Update" : "Create"} type="submit" disabled={disabled} />
            <input type="text" placeholder={currentTask ? "Edit task..." : "Enter new task..."} defaultValue={currentTask?.task} className={css.inputarea} autoComplete="off" autoFocus={true} onChange={({target}) => setTask(target.value)} required={true} />
            <span className={css.newError}>{taskErr}</span>
            <textarea className={css.inputbox} placeholder={currentTask ? "Edit details..." : "Add details..."} defaultValue={currentTask?.detail} autoComplete="off" onChange={({ target }) => setDetail(target.value)} ref={textarea}></textarea>
            <span className={css.newError}>{detailErr}</span>
            {disabled && <LoadCircle />}
        </FormLayout>
    );
};

export default NewTask;