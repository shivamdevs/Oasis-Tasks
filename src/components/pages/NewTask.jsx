import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { addNewList, addNewTask } from "../../fb.todo";
import { auth } from "../../fb.user";
import { BackHeaderWithButton } from "../BackHeader";
import { FormLayout } from "../Layout";
import { LoadCircle } from "../Loading";
import css from './../../styles/Home.module.css';

function NewTask() {
    const navigate = useNavigate();

    const params = useParams();

    const [user] = useAuthState(auth);
    const [task, setTask] = useState("");
    const [detail, setDetail] = useState("");
    const [taskErr, setTaskError] = useState("");
    const [detailErr, setDetailError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        const posttask = task.trim();
        if (!posttask) return e.target[2].focus();
        setDisabled(true);
        const data = await addNewTask(user, params.listid, posttask, detail);
        if (data.type === "success") {
            return navigate(-1);
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
            console.log(data);
        }
    };
    useEffect(() => {
        if (params.listid === "starred") navigate(-1);
    }, [navigate, params.listid]);
    return (
        <FormLayout className={css.newlist} onSubmit={submitForm}>
            <BackHeaderWithButton label="Add new task" button="Create" type="submit" disabled={disabled} />
            <input type="text" placeholder="Enter new task..." className={css.inputarea} autoComplete="off" autoFocus={true} onChange={({target}) => setTask(target.value)} required={true} />
            <span className={css.newError}>{taskErr}</span>
            <textarea className={css.inputbox} placeholder="Details..." autoComplete="off" onChange={({ target }) => { setDetail(target.value); target.style.height = 'inherit'; target.style.height = (target.scrollHeight + 10) + 'px' }}></textarea>
            <span className={css.newError}>{detailErr}</span>
            {disabled && <LoadCircle />}
        </FormLayout>
    );
};

export default NewTask;