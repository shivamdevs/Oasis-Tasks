import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addNewList, updateList } from "../../../fb.todo";
import { auth } from "../../../fb.user";
import { BackHeaderWithButton } from "../../parts/BackHeader";
import { FormLayout } from "../../layouts/Layout";
import { LoadCircle } from "../../layouts/Loading";
import css from './../../../styles/Home.module.css';

function NewList({currentList = null, publish}) {
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [name, setName] = useState(currentList?.label || "");
    const [nameErr, setNameError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const submitForm = async (e) => {
        setNameError("");
        e.preventDefault();
        const postname = name.trim();
        if (!postname) return e.target[2].focus();
        // if (postname.match(/[^a-zA-Z0-9\-._ ]/gm)) {
        //     setNameError('No special characters except dash, underscore and period is allowed.');
        //     return e.target[2].focus();
        // }
        setDisabled(true);
        const data = currentList ? await updateList(currentList.key, "label", postname) : await addNewList(user, postname, {});
        if (data.type === "success") {
            publish();
            return navigate(-1);
        }
        setDisabled(false);
        if (data.action === "name") {
            setNameError(data.data);
            e.target[2].focus();
        } else if (data.action === "toast") {
            toast.error(data.data);
        } else {
            console.error(data);
        }
    };
    return (
        <FormLayout className={css.newlist} onSubmit={submitForm}>
            <BackHeaderWithButton label={currentList ? "Rename list" : "Add new list"} button={currentList ? "Rename" : "Create"} type="submit" disabled={disabled} />
            <input type="text" placeholder={currentList ? "Rename list..." : "Enter new list..."} className={css.inputarea} defaultValue={currentList?.label} autoComplete="off" autoFocus={true} onChange={({target}) => setName(target.value)} required={true} />
            <span className={css.newError}>{nameErr}</span>
            {disabled && <LoadCircle />}
        </FormLayout>
    );
};

export default NewList;