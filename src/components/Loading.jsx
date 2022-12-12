import { useState } from 'react';
import app from '../appdata';
import css from './../styles/Loading.module.css';
import Layout from './Layout';

function Loading(props) {
    const [loaded, setLoad] = useState(0);
    setInterval(() => { setLoad(old => old < 100 ? ++old : old); }, 70);
    return (
        <Layout className={css.loader}>
            <div></div>
            <div>
                <img className={css.logo} src="/assets/images/loading/logo192.png" alt="" />
                <div className={css.progress}>
                    <div className={css.fill} style={{ "--fill": loaded + "%" }}></div>
                </div>
            </div>
            <div className={css.footer}>
                <div className={css.company}>{app.copyright}</div>
                <div className={css.version}>{app.version}</div>
            </div>
        </Layout>
    );
};

export default Loading;