import Layout from "../../../layouts/Layout";
import BackHeader from '../../../parts/BackHeader';

import css from './../../../../styles/Home.module.css';
import app from "../../../../appdata";
import { NavButton } from "../../../parts/Nav";


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