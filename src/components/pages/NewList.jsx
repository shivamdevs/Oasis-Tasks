import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addNewList } from "../../fb.todo";
import { auth } from "../../fb.user";
import { BackHeaderWithButton } from "../BackHeader";
import { FormLayout } from "../Layout";
import { LoadCircle } from "../Loading";
import css from './../../styles/Home.module.css';

function NewList({publish}) {
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const [nameErr, setNameError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const submitForm = async (e) => {
        setNameError("");
        e.preventDefault();
        const postname = name.trim();
        if (!postname) return e.target[2].focus();
        if (postname.match(/[^a-zA-Z0-9\-._ ]/gm)) {
            setNameError('No special characters except dash, underscore and period is allowed.');
            return e.target[2].focus();
        }
        setDisabled(true);
        const data = await addNewList(user, postname, {});
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
            <BackHeaderWithButton label="Add new list" button="Create" type="submit" disabled={disabled} />
            <input type="text" placeholder="Enter new list..." className={css.inputarea} autoComplete="off" autoFocus={true} onChange={({target}) => setName(target.value)} required={true} />
            <span className={css.newError}>{nameErr}</span>
            {disabled && <LoadCircle />}
        </FormLayout>
    );
};

export default NewList;