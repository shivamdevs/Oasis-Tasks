import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const app = {
    name: 'To do',
    version: '1.0.0',
    copyright: '© Shivam Devs 2022',
    updated: 'December 12, 2022 06:55 PM',
};

export default app;

const NavButton = ({children = "", to, className = "", replace = false, ...props}) => {
    const navigate = useNavigate();
    return (
        <button {...props} className={className || "button"} onClick={() => navigate(to, {replace: replace})}>{children}</button>
    );
};
const NavAnchor = ({children = "", to, className = "", replace = false, ...props}) => {
    const navigate = useNavigate();
    return (
        <a {...props} className={className || "link"} onClick={() => navigate(to, {replace: replace})}>{children}</a>
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