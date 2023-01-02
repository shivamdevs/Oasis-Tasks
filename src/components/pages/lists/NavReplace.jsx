import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../../app.data";
import css from './../../../styles/Home.module.css';

function NavReplace({
    to,
    children = "",
    bucket = "default",
    current = "default",
    setRef = null,
    ...props
}) {
    const navigate = useNavigate();
    const [isActive, setActive] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        setActive(current === bucket);
        if (current === bucket) {
            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            setRef && setRef(ref?.current);
        }
    }, [bucket, current, setRef]);

    const clickAction = () => {
        navigate(to, { replace: true });
        if (window.localStorage) {
            window.localStorage.setItem(`${app.bucket}.current.bucket`, bucket);
        }
    };
    return (
        <a {...props} ref={ref} className={classNames(
            css.category,
            (isActive ? css.activeCategory : ""),
        )} onClick={clickAction}>{children}</a>
    );
}

export default NavReplace;