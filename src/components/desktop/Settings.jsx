import { Link, useNavigate } from "react-router-dom";
import BackHeader from "../parts/BackHeader";
import CenterLayer from "./CenterLayer";
import css from './../../styles/Profile.module.css';
import app from "../../app.data";
import { logout } from "../../fb.user";
import classNames from "classnames";


function Settings({admin = null, user = null}) {
    const navigate = useNavigate();
    const doLogout = async () => {
        logout();
        navigate(-1);
    };
    return (
        <CenterLayer maxWidth={420}>
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
                {admin && <Link className={css.navigate} to={`/admin/${admin?.id}`}>Admin Console</Link>}
                <a className={css.navigate} href={`${app.pathname}/support/tasks`} target="_blank" rel="noreferrer">Support</a>
                <button onClick={doLogout} className={classNames("button", css.logout)} replace="true"><i className="fas fa-arrow-right-from-bracket"></i>&nbsp;&nbsp;Sign out</button>
                <div className={css.footer}>
                    <div className={css.company}>{app.copyright}</div>
                    <div className={css.version}>{app.version}</div>
                </div>
            </div>
        </CenterLayer>
    )
}

export default Settings;