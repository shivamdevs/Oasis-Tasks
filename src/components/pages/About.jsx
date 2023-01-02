import Layout from "../layouts/Layout";
import BackHeader from '../parts/BackHeader';

import css from './../../styles/About.module.css';
import app from "../../app.data";


function About() {
    return (
        <Layout>
            <BackHeader label="About" />
            <div className={css.title}>
                <img src="/logo192.png" alt="" />
                <span>{app.name}</span>
            </div>
            <div className={css.area}>
                <div className={css.label}>
                    <span className={css.data}>Version: </span>
                    <span className={css.value}>{app.version}</span>
                </div>
                <div className={css.label}>
                    <span className={css.data}>Copyright: </span>
                    <span className={css.value}>{app.parent}</span>
                </div>
                <div className={css.label}>
                    <span className={css.data}>Updated: </span>
                    <span className={css.value}>{app.updated}</span>
                </div>
            </div>
        </Layout>
    );
};

export default About;