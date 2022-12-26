import { useState } from "react";
import { LoadCircle } from "../../appdata";
import { BackHeaderWithButton } from "../BackHeader";
import { FormLayout } from "../Layout";
import css from './../../styles/Home.module.css';

function NewList() {
    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [disabled, setDisabled] = useState(false);
    const submitForm = (e) => {
        e.preventDefault();
        const postname = name.trim();
        if (!postname) return e.target[0].focus();
        setDisabled(true);
        setNameErr("true");
    };
    return (
        <FormLayout className={css.newlist} onSubmit={submitForm}>
            <BackHeaderWithButton label="Add new list" button="Create" type="submit" disabled={disabled} />
            <input type="text" placeholder="Enter new list name..." className={css.inputarea} autoComplete="off" autoFocus={true} onChange={({value}) => setName(value)} />
            <span className={css.newError}>{nameErr}</span>
            {disabled && <LoadCircle />}
        </FormLayout>
    );
};

export default NewList;