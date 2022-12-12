import { useState } from 'react';
import app from '../appdata';
import css from './../styles/Loading.module.css';

import logo from './../assets/images/loading/logo192.png';

function Loading(props) {
    const [loaded, setLoad] = useState(0);
    setInterval(() => { setLoad(old => old < 100 ? ++old : old); }, 70);
    return (
        <div className={css.loader}>
            <div></div>
            <div>
                <img className={css.logo} src={logo} alt="" />
                <div className={css.progress}>
                    <div className={css.fill} style={{ "--fill": loaded + "%" }}></div>
                </div>
            </div>
            <div className={css.footer}>
                <div className={css.company}>{app.copyright}</div>
                <div className={css.version}>{app.version}</div>
            </div>
        </div>
    );
};

export default Loading;