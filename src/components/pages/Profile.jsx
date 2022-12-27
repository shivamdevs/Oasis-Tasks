import Layout from "../Layout";
import BackHeader from '../BackHeader';

import css from './../../styles/Profile.module.css';
import app, { NavButton } from "../../appdata";


function ProfileMenu() {
    return (
        <Layout>
            <BackHeader />
            <NavButton to="/logout" className={css.app} replace="true">Sign out</NavButton>
            <span>{app.copyright}</span>
        </Layout>
    );
};

export default ProfileMenu;