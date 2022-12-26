import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/override.css";

const app = {
    name: 'To do',
    version: '1.0.0',
    copyright: '© Shivam Devs 2022',
    updated: 'December 12, 2022 06:55 PM',
};

export default app;

const NavButton = ({children = "", to, className = "", ...props}) => {
    const navigate = useNavigate();
    return (
        <button {...props} className={className || "button"} onClick={() => navigate(to)}>{children}</button>
    );
};
const NavAnchor = ({ children = "", to, className = "", ...props }) => {
    const navigate = useNavigate();
    return (
        <a {...props} className={className || "link"} onClick={() => navigate(to)}>{children}</a>
    );
};
const NavReplace = ({ children = "", to, className = "", bucket = "default", activeClassName = "", ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isActive, setActive] = useState(false);
    const ref = useRef();
    useEffect(() => {
        setActive(location.pathname === encodeURI(to));
        if (location.pathname === encodeURI(to)) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [location, to]);

    const clickAction = () => {
        navigate(to, { replace: true });
        if (window.localStorage) {
            window.localStorage.setItem(`${app.name.replaceAll(' ', '').toLowerCase()}.current.bucket`, bucket);
        }
    };
    return (
        <a {...props} ref={ref} className={classNames(
            className || "link",
            (isActive ? activeClassName || "active" : ""),
        )} onClick={clickAction}>{children}</a>
    );
};

export {
    NavAnchor,
    NavButton,
    NavReplace,
};

export function Redirect({to, replace = true}) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: replace });
    }, [navigate, replace, to]);
}

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