import classNames from 'classnames';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Redirect } from '../appdata';
import { auth } from '../fb.user';
import css from './../styles/Auth.module.css';
import Layout from './Layout';
import Notfound from './Notfound';
import Create from './pages/auth/Create';
import Email from './pages/auth/Email';

function AuthLayout() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) navigate(-1);
        if (loading) {}
        if (error) console.error(error);
    }, [error, loading, navigate, user]);
    return (
        <Layout className={css.authbox}>
            <Routes>
                <Route path="/" element={<Redirect to="/" replace={true} />} />
                <Route path="/email" element={<Email />} />
                <Route path="/create" element={<Create />} />
                <Route path="*" element={<Notfound />} />
            </Routes>
        </Layout>
    );
};

export default AuthLayout;

export function Input({
    label = "",
    id = "",
    value = "",
    updater = null,
    error = "",
    focus = false,
    complete = "auto",
    type = "text",
    disabled = false,
}) {
    return (
        <div className={css.formgroup}>
            <label htmlFor={id} className={css.formlabel}>{label}</label>
            <input
                type={type}
                name={id}
                id={id}
                className={classNames(
                    css.forminput,
                    (error ? css.forminputerror : "")
                )}
                onChange={({ target }) => updater && updater(target.value)}
                defaultValue={value}
                required
                autoComplete={complete}
                autoFocus={focus}
                disabled={disabled}
            />
            <div className={css.formerror}>{error}</div>
        </div>
    );
}