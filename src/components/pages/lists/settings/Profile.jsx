import Layout from "../../../layouts/Layout";
import BackHeader from '../../../parts/BackHeader';

import css from './../../../../styles/Profile.module.css';
import app from "../../../../app.data";
import { NavAnchor } from "../../../parts/Nav";
import classNames from "classnames";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "../../About";
import { logout } from "../../../../fb.user";


function ProfileMenu({admin = null, user = {}}) {
    const navigate = useNavigate();
    const doLogout = async() => {
        logout();
        navigate(-1);
    };
    return (
        <Layout className={css.layout}>
            <BackHeader label="Profile" />
            <div className={css.profile}>
                <div className={css.user}>
                    <div className={css.photo}>
                        <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=624ef0&color=fff`} alt="" />
                    </div>
                    <div className={css.data}>
                        <div className={css.name}>{user?.displayName}</div>
                        <div className={css.email}>{user?.email}</div>
                        {admin && <div className={css.admin}>Admin level: {admin?.level}</div>}
                    </div>
                </div>
                {admin && <NavAnchor className={css.navigate} to={`/admin/${admin?.id}`}>Admin Console</NavAnchor>}
                <a className={css.navigate} href={`${app.pathname}/support/tasks`} target="_blank" rel="noreferrer">Support</a>
                <NavAnchor className={css.navigate} to="./about">About</NavAnchor>
                {/* <NavAnchor className={css.navigate} to="./about/updatelog">Update Log</NavAnchor> */}
                <button onClick={doLogout} className={classNames("button", css.logout)} replace="true"><i className="fas fa-arrow-right-from-bracket"></i>&nbsp;&nbsp;Sign out</button>
                <div className={css.footer}>
                    <div className={css.company}>{app.copyright}</div>
                    <div className={css.version}>{app.version}</div>
                </div>
            </div>
            <Routes>
                <Route path="/about" element={<About />} />
            </Routes>
        </Layout>
    );
};

export default ProfileMenu;