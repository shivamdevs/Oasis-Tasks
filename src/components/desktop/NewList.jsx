import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { escapePage, setTitle } from "../../app.functions";
import { addNewList, updateList } from "../../fb.todo";
import { auth } from "../../fb.user";
import CenterLayer from "./CenterLayer";
import css from './styles/Adder.module.css';


function NewList({ currentList = null, publish }) {

    const navigate = useNavigate();
    escapePage(() => navigate(-1));
    const [user] = useAuthState(auth);
    const [name, setName] = useState(currentList?.label || "");
    const [nameErr, setNameError] = useState("");
    const [disabled, setDisabled] = useState(false);
    setTitle(currentList ? "Rename list" : "Add new list", currentList?.label);
    const submitForm = async (e) => {
        setNameError("");
        e.preventDefault();
        const postname = name.trim();
        if (!postname) return e.target[0].focus();
        setDisabled(true);
        const data = currentList ? await updateList(currentList.key, "label", postname) : await addNewList(user, postname);
        if (data.type === "success") {
            publish();
            return navigate(-1);
        }
        setDisabled(false);
        if (data.action === "name") {
            setNameError(data.data);
            e.target[0].focus();
        } else if (data.action === "toast") {
            toast.error(data.data);
        } else {
            console.error(data);
        }
    };
    return (
        <CenterLayer maxWidth={400} onOuterClick={() => navigate(-1)}>
            <header className={css.header}>
                <span>{currentList ? "Rename list" : "Add new list"}</span>
                <Link to={-1} className={css.closer}><i className="fas fa-times"></i></Link>
            </header>
            <form  onSubmit={submitForm} className={css.body}>
                <input className={css.input} placeholder="List label..." type="text" autoComplete="off" autoFocus onChange={({target}) => setName(target.value)} disabled={disabled} defaultValue={name} />
                <div className={css.error}>{nameErr}</div>
                <div className={css.flexbox}>
                    <Link to={-1} className={css.button}>Cancel</Link>
                    <button className={css.button} disabled={disabled} type="submit">{currentList ? "Rename" : "Create"}</button>
                </div>
            </form>
        </CenterLayer>
    )
}

export default NewList;