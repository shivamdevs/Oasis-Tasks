import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../../../fb.user';
import { Input } from '../../AuthLayout';
import { BackHeaderWithButton } from '../../BackHeader';
import { FormLayout } from '../../Layout';
import { LoadCircle } from '../../Loading';
import css from './../../../styles/Auth.module.css';

function Create() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [score, setScore] = useState(0);
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const submitForm = async (e) => {
        setNameError("");
        setEmailError("");
        setPasswordError("");

        e.preventDefault();

        const postname = name.trim();
        const postemail = email.trim();
        const postpassword = password.trim();

        if (!postname) return e.target[2].focus();
        if (!postemail) return e.target[3].focus();
        if (!postpassword) return e.target[4].focus();
        if (score < 4) return (e.target[4].focus(), setPasswordError("Choose a strong password"));

        setDisabled(true);

        const getauth = await registerWithEmailAndPassword(name, email, password);

        if (getauth.type === "success") {
            return navigate(-1);
        }
        setDisabled(false);

        if (getauth.action === "name") {
            setNameError(getauth.data);
            e.target[2].focus();
        } else if (getauth.action === "email") {
            setEmailError(getauth.data);
            e.target[3].focus();
        } else if (getauth.action === "password") {
            setPasswordError(getauth.data);
            e.target[4].focus();
        } else if (getauth.action === "toast") {
            toast.error(getauth.data);
        } else {
            console.error(getauth);
        }
    }
    return (
        <FormLayout onSubmit={submitForm} className={css.authform}>
            <BackHeaderWithButton button="Sign up" type="submit" disabled={disabled} />
            <div className={css.authgreet}>
                <div className={css.title}>Welcome!</div>
                <div className={css.subtitle}>It's an honour to be a part of your journey!</div>
            </div>
            <Input
                id="name"
                focus={true}
                complete="name"
                label="Full name"
                error={nameError}
                disabled={disabled}
                updater={(value) => setName(value)}
            />
            <Input
                id="email"
                type="email"
                complete="email"
                label="Email address"
                error={emailError}
                disabled={disabled}
                updater={(value) => setEmail(value)}
            />
            <Input
                id="password"
                type="password"
                complete="new-password"
                label="Password"
                error={passwordError}
                disabled={disabled}
                updater={(value) => setPassword(value)}
            />
            <PasswordStrengthBar
                className={css.formpassword}
                password={password}
                shortScoreWord=""
                minLength={1}
                scoreWords={[]}
                onChangeScore={(value) => setScore(value)}
            />
            {disabled && <LoadCircle />}
        </FormLayout>
    );
};

export default Create;