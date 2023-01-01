import { useState } from 'react';
import app from '../../appdata';
import css from './../../styles/Loading.module.css';
import Layout from './Layout';

function Loading() {
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

export function LoadCircle() {
    return (
        <div className="loadCircle">
            <div className="loadBlock">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="loadSVG"
                    width="1em"
                    height="1em"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#46dff0"
                        strokeWidth="0"
                        fill="none"
                    ></circle>
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="dodgerblue"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1.6s"
                            values="0 50 50;180 50 50;720 50 50"
                            keyTimes="0;0.5;1"
                        ></animateTransform>
                        <animate
                            attributeName="stroke-dasharray"
                            repeatCount="indefinite"
                            dur="1.6s"
                            values="25.132741228718345 226.1946710584651;201.06192982974676 50.26548245743669;25.132741228718345 226.1946710584651"
                            keyTimes="0;0.5;1"
                        ></animate>
                    </circle>
                </svg>
            </div>
        </div>
    );
}

export function LoadSVG({color = "dodgerblue", width = 8}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="loadSVG"
            width="1em"
            height="1em"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#46dff0"
                strokeWidth="0"
                fill="none"
            ></circle>
            <circle
                cx="50"
                cy="50"
                r="40"
                stroke={color}
                strokeWidth={width}
                strokeLinecap="round"
                fill="none"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1.6s"
                    values="0 50 50;180 50 50;720 50 50"
                    keyTimes="0;0.5;1"
                ></animateTransform>
                <animate
                    attributeName="stroke-dasharray"
                    repeatCount="indefinite"
                    dur="1.6s"
                    values="25.132741228718345 226.1946710584651;201.06192982974676 50.26548245743669;25.132741228718345 226.1946710584651"
                    keyTimes="0;0.5;1"
                ></animate>
            </circle>
        </svg>
    );
}


export function LoadCirclePlain() {
    return (
        <div className="loadCircle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="loadSVG"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#46dff0"
                    strokeWidth="0"
                    fill="none"
                ></circle>
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1.6s"
                        values="0 50 50;180 50 50;720 50 50"
                        keyTimes="0;0.5;1"
                    ></animateTransform>
                    <animate
                        attributeName="stroke-dasharray"
                        repeatCount="indefinite"
                        dur="1.6s"
                        values="25.132741228718345 226.1946710584651;201.06192982974676 50.26548245743669;25.132741228718345 226.1946710584651"
                        keyTimes="0;0.5;1"
                    ></animate>
                </circle>
            </svg>
        </div>
    );
}