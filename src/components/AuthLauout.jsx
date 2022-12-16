import { Route, Routes } from 'react-router-dom';
import { Redirect } from '../appdata';
import css from './../styles/Auth.module.css';
import BackHeader from './BackHeader';
import Layout from './Layout';
import Create from './pages/auth/Create';
import Email from './pages/auth/Email';
import Google from './pages/auth/Google';

function AuthLauout() {
    return (
        <Layout>
            <BackHeader />
            <Routes>
                <Route path="/" element={<Redirect to="/" replace={true} />} />
                <Route path="/email" element={<Email />} />
                <Route path="/create" element={<Create />} />
                <Route path="/google" element={<Google />} />
            </Routes>
        </Layout>
    );
};

export default AuthLauout;

export function Input({
    label = "",
    id = "",
    value = "",
    updater = null,
    error = "",
    focus = false,
    complete = "auto",
    type = "text"
}) {
    return (
        <div className={css.formgroup}>
            <label htmlFor={id} className={css.formlabel}>{label}</label>
            <input
                type={type}
                name={id}
                id={id}
                className={css.forminput}
                onChange={({ target }) => updater && updater(target.value)}
                defaultValue={value}
                required
                autoComplete={complete}
                autoFocus={focus}
            />
            <div className={css.formerror}>{error}</div>
        </div>
    );
}