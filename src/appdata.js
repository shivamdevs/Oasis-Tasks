import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const app = {
    name: 'To do',
    version: '1.0.0',
    copyright: '© Shivam Devs 2022',
    updated: 'December 12, 2022 06:55 PM',
};

export default app;

const randomNumber = (min = 0, max = 9) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomString = (length = 5) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
};

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
const NavReplace = ({
    to,
    children = "",
    className = "",
    bucket = "default",
    current = "default",
    activeClassName = "",
    ...props
}) => {
    const navigate = useNavigate();
    const [isActive, setActive] = useState(false);
    const ref = useRef();
    useEffect(() => {
        setActive(current === bucket);
        if (current === bucket) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [bucket, current]);

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
    randomNumber,
    randomString,
};

export function Redirect({to, replace = true}) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: replace });
    }, [navigate, replace, to]);
}