import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../../../fb.user';
import { Input } from '../../layouts/AuthLayout';
import { BackHeaderWithButton } from '../../parts/BackHeader';
import { FormLayout } from '../../layouts/Layout';
import { LoadCircle } from '../../layouts/Loading';
import css from './../../../styles/Auth.module.css';

function Email() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const submitForm = async (e) => {
        setEmailError("");
        setPasswordError("");

        e.preventDefault();

        const postemail = email.trim();
        const postpassword = password.trim();

        if (!postemail) return e.target[2].focus();
        if (!postpassword) return e.target[3].focus();

        setDisabled(true);

        const getauth = await logInWithEmailAndPassword(email, password);

        if (getauth.type === "success") {
            return navigate(-1);
        }
        setDisabled(false);

        if (getauth.action === "email") {
            e.target[2].focus();
            setEmailError(getauth.data);
        } else if (getauth.action === "password") {
            e.target[3].focus();
            setPasswordError(getauth.data);
        } else if (getauth.action === "toast") {
            toast.error(getauth.data);
        } else {
            console.error(getauth);
        }
    }
    return (
        <FormLayout onSubmit={submitForm} className={css.authform}>
            <BackHeaderWithButton button="Sign in" type="submit" disabled={disabled} />
            <div className={css.authgreet}>
                <div className={css.title}>Welcome back!</div>
                <div className={css.subtitle}>It's good to see you again!</div>
            </div>
            <Input
                id="email"
                type="email"
                complete="email"
                focus={true}
                label="Email address"
                disabled={disabled}
                error={emailError}
                updater={(value) => setEmail(value)}
            />
            <Input
                id="password"
                type="password"
                complete="current-password"
                label="Password"
                disabled={disabled}
                error={passwordError}
                updater={(value) => setPassword(value)}
            />
            {disabled && <LoadCircle />}
        </FormLayout>
    );
};

export default Email;